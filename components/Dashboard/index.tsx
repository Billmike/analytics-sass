import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, Users, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { generateMockData } from '@/lib/data';
import { MetricType } from '@/lib/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [data, setData] = useState(generateMockData(timeRange));
  
  // Calculate metrics based on revenue data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateMetrics = (revenueData: any) => {
    const currentRevenue = revenueData[revenueData.length - 1].value;
    const previousRevenue = revenueData[revenueData.length - 2]?.value || currentRevenue;
    const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

    return {
      activeUsers: Math.floor(currentRevenue / 40), // Simplified calculation
      activeUsersChange: revenueChange * 0.8, // Correlated with revenue
      revenue: currentRevenue,
      revenueChange: revenueChange,
      newSignups: Math.floor(currentRevenue / 120), // Simplified calculation
      newSignupsChange: revenueChange * 0.6, // Correlated with revenue
      churnRate: 5 - (revenueChange * 0.1), // Inverse correlation with revenue
      churnRateChange: -revenueChange * 0.1, // Inverse correlation with revenue
    };
  };

  const [metrics, setMetrics] = useState(calculateMetrics(data.revenueData));

  // Update data when time range changes
  useEffect(() => {
    const newData = generateMockData(timeRange);
    setData(newData);
    setMetrics(calculateMetrics(newData.revenueData));
  }, [timeRange]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData(timeRange);
      setData(newData);
      setMetrics(calculateMetrics(newData.revenueData));
    }, 5000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const MetricCard = ({ title, value, change, icon: Icon }: MetricType) => (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === 'number' && value >= 1000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value}
          {title === 'Revenue' && ' $'}
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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <select 
          className="border rounded-md p-2"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

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
          value={`${Number(metrics.churnRate).toFixed(2)}%`}
          change={metrics.churnRateChange}
          icon={Users}
        />
      </div>

      {/* Revenue Chart */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* User Engagement */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.userEngagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Daily Active Users" stroke="#8884d8" />
                <Line type="monotone" dataKey="Weekly Active Users" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Monthly Active Users" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature Usage */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.featureUsage} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" />
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Retention Chart */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>User Retention</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="retention" 
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
