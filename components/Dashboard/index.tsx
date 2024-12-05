import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, Users, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { generateMockData } from '@/lib/data';
import Filters from './filters';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  // Filter states
  const [timeRange, setTimeRange] = useState('6m');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedSegments, setSelectedSegments] = useState(['Enterprise', 'SMB', 'Startup']);
  const [selectedFeatures, setSelectedFeatures] = useState(['Dashboard', 'Analytics', 'Reports', 'API Access', 'Integrations']);
  const [comparisonMode, setComparisonMode] = useState(false);

  // Data state
  const [data, setData] = useState(generateMockData({
    timeRange,
    dateRange,
    selectedSegments,
    selectedFeatures,
    comparisonMode
  }));

  // Calculate metrics based on time series data
  const calculateMetrics = (timeSeriesData) => {
    const currentData = timeSeriesData[timeSeriesData.length - 1];
    const previousData = timeSeriesData[timeSeriesData.length - 2];
    
    const calculateChange = (current, previous) => 
      ((current - previous) / previous) * 100;

    return {
      activeUsers: Math.floor(currentData.total / 40),
      activeUsersChange: calculateChange(
        currentData.total,
        previousData?.total || currentData.total
      ),
      revenue: currentData.total,
      revenueChange: calculateChange(
        currentData.total,
        previousData?.total || currentData.total
      ),
      newSignups: Math.floor(currentData.total / 120),
      newSignupsChange: calculateChange(
        currentData.total,
        previousData?.total || currentData.total
      ) * 0.6,
      churnRate: 5 - (calculateChange(
        currentData.total,
        previousData?.total || currentData.total
      ) * 0.1),
      churnRateChange: -calculateChange(
        currentData.total,
        previousData?.total || currentData.total
      ) * 0.1
    };
  };

  const [metrics, setMetrics] = useState(calculateMetrics(data.timeSeriesData));

  // Update data when filters change
  useEffect(() => {
    const newData = generateMockData({
      timeRange,
      dateRange,
      selectedSegments,
      selectedFeatures,
      comparisonMode
    });
    setData(newData);
    setMetrics(calculateMetrics(newData.timeSeriesData));
  }, [timeRange, dateRange, selectedSegments, selectedFeatures, comparisonMode]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData({
        timeRange,
        dateRange,
        selectedSegments,
        selectedFeatures,
        comparisonMode
      });
      setData(newData);
      setMetrics(calculateMetrics(newData.timeSeriesData));
    }, 5000);
    return () => clearInterval(interval);
  }, [timeRange, dateRange, selectedSegments, selectedFeatures, comparisonMode]);

  const MetricCard = ({ title, value, change, icon: Icon }) => (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {title === 'Revenue' && '$'}
          {typeof value === 'number' && value >= 1000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value?.toFixed(1)}
        </div>
        <div className="flex items-center space-x-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <p className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change).toFixed(1)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Format time series data for charts
  const formatChartData = (timeSeriesData) => {
    return timeSeriesData.map(point => ({
      name: point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      ...selectedSegments.reduce((acc, segment) => ({
        ...acc,
        [segment]: point[segment]
      }), {}),
      total: point.total
    }));
  };

  const chartData = formatChartData(data.timeSeriesData);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
      </div>

      <Filters
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedSegments={selectedSegments}
        setSelectedSegments={setSelectedSegments}
        selectedFeatures={selectedFeatures}
        setSelectedFeatures={setSelectedFeatures}
        comparisonMode={comparisonMode}
        setComparisonMode={setComparisonMode}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          change={metrics.activeUsersChange}
          icon={Users}
        />
        <MetricCard
          title="Revenue"
          value={metrics.revenue}
          change={metrics.revenueChange}
          icon={CreditCard}
        />
        <MetricCard
          title="New Signups"
          value={metrics.newSignups}
          change={metrics.newSignupsChange}
          icon={CalendarDays}
        />
        <MetricCard
          title="Churn Rate"
          value={metrics.churnRate}
          change={metrics.churnRateChange}
          icon={Users}
        />
      </div>

      {/* Revenue Trends */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {selectedSegments.map((segment, index) => (
                <Line
                  key={segment}
                  type="monotone"
                  dataKey={segment}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                />
              ))}
              {comparisonMode && (
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#666"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Feature Usage */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.featureUsage}
                layout="vertical"
                margin={{ left: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" />
                {comparisonMode && (
                  <Bar dataKey="previousUsers" fill="#82ca9d" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Segments */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>User Segments</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.userSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.userSegments.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
