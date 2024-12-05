/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, Users, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { generateMockData } from '@/lib/data';
import {FilterModal} from './FilterModal';
import {SideNav} from './SideNav';
import { ThemeProvider, useTheme } from '@/lib/context/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardContent = () => {
  const { theme } = useTheme();
  
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
  const calculateMetrics = (timeSeriesData: any) => {
    const currentData = timeSeriesData[timeSeriesData.length - 1];
    const previousData = timeSeriesData[timeSeriesData.length - 2];
    
    const calculateChange = (current: any, previous: any) => 
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

  const MetricCard = ({ title, value, change, icon: Icon }: any) => (
    <Card className="bg-white dark:bg-gray-900 rounded-lg transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white transition-colors">
          {title === 'Revenue' && '$'}
          {typeof value === 'number' && value >= 1000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value?.toFixed(1)}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <div className={`text-xs px-2 py-1 rounded transition-colors ${
            change > 0 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
          }`}>
            {Math.abs(change).toFixed(1)}%
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs. last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Format time series data for charts
  const formatChartData = (timeSeriesData: any) => {
    return timeSeriesData.map((point: any) => ({
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <SideNav />
      
      <div className="flex-1">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold dark:text-white transition-colors">Overview</h2>
            <div className="flex items-center gap-3">
              <FilterModal
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
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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

          <Card className="bg-white dark:bg-gray-900 transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-semibold dark:text-white transition-colors">Revenue Over Time</h3>
                  <div className="flex items-center gap-6 mt-2">
                    {selectedSegments.map((segment, index) => (
                      <div key={segment} className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                          {segment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false}
                      stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                    />
                    <XAxis 
                      dataKey="name"
                      stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    />
                    <YAxis 
                      stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                        borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                        color: theme === 'dark' ? '#FFFFFF' : '#000000'
                      }}
                    />
                    {selectedSegments.map((segment, index) => (
                      <Line
                        key={segment}
                        type="monotone"
                        dataKey={segment}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card className="bg-white dark:bg-gray-900 transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-base font-semibold dark:text-white transition-colors">Feature Usage</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Top Features by Usage</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {data.featureUsage.map((feature) => (
                    <div key={feature.name} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium dark:text-white transition-colors">{feature.name}</span>
                          <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                            <span className="font-medium">{feature.users}</span>
                            <span> • {((feature.users / data.featureUsage.reduce((acc, curr) => acc + curr.users, 0)) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded h-2 transition-colors">
                          <div 
                            className="bg-teal-500 h-2 rounded transition-colors"
                            style={{ 
                              width: `${(feature.users / Math.max(...data.featureUsage.map(f => f.users))) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-900 transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-base font-semibold dark:text-white transition-colors">User Segments</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Distribution</span>
                  </div>
                </div>
                <div className="h-80">
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
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                          color: theme === 'dark' ? '#FFFFFF' : '#000000'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
};