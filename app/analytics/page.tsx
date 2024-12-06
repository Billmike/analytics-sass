/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, MousePointer, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { generateAnalyticsData } from '@/lib/data/analyticsData';
import { useTheme } from '@/lib/context/ThemeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(generateAnalyticsData({ timeRange }));

  useEffect(() => {
    setData(generateAnalyticsData({ timeRange }));
  }, [timeRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateAnalyticsData({ timeRange }));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const MetricCard = ({ title, value, change, icon: Icon, suffix = '' }: any) => (
    <Card className="bg-white dark:bg-gray-900 rounded-lg transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {suffix}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <div className={`text-xs px-2 py-1 rounded ${
            change > 0 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
          }`}>
            {Math.abs(change).toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Detailed insights and user behavior analysis</p>
        </div>
        <Select
          value={timeRange}
          onValueChange={handleTimeRangeChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range">
              {timeRange === '7d' && 'Last 7 days'}
              {timeRange === '30d' && 'Last 30 days'}
              {timeRange === '90d' && 'Last 90 days'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Users"
          value={data.keyMetrics.activeUsers.current}
          change={data.keyMetrics.activeUsers.trend}
          icon={Users}
        />
        <MetricCard
          title="Engagement Rate"
          value={data.keyMetrics.engagement.current.toFixed(1)}
          change={data.keyMetrics.engagement.trend}
          icon={MousePointer}
          suffix="%"
        />
        <MetricCard
          title="Conversion Rate"
          value={data.keyMetrics.conversionRate.current.toFixed(1)}
          change={data.keyMetrics.conversionRate.trend}
          icon={ArrowUpRight}
          suffix="%"
        />
        <MetricCard
          title="Avg. Session Duration"
          value={Math.floor(data.keyMetrics.averageSessionTime.current)}
          change={data.keyMetrics.averageSessionTime.trend}
          icon={Clock}
          suffix="s"
        />
      </div>

      {/* Traffic Sources */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Traffic Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.trafficSources}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                />
                <XAxis 
                  dataKey="source"
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
                <Bar dataKey="sessions" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Device Distribution */}
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Device Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.deviceAnalytics.distribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="share"
                    label={({ name, share }) => `${name}: ${share}%`}
                  >
                    {data.deviceAnalytics.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Geographic Data */}
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Top Countries</h3>
            <div className="space-y-4">
              {data.geographicData.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-medium dark:text-white">{country.country}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {country.users.toLocaleString()} users
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
