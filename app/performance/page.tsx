/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, AlertTriangle, Server } from 'lucide-react';
import { generatePerformanceData } from '@/lib/performance-data';
import { useTheme } from '@/lib/context/ThemeContext';

export default function Performance () {
  const { theme } = useTheme();
  const [data, setData] = useState(generatePerformanceData({ timeRange: '1h' }));

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generatePerformanceData({ timeRange: '1h' }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, secondaryValue, icon: Icon, status = 'normal' }: any) => (
    <Card className="bg-white dark:bg-gray-900 rounded-lg transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${
          status === 'critical' ? 'text-red-500' :
          status === 'warning' ? 'text-yellow-500' :
          'text-gray-500 dark:text-gray-400'
        }`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white transition-colors">
          {value}
        </div>
        {secondaryValue && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {secondaryValue}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white transition-colors">Performance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Real-time system metrics and performance data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </div>

      {/* System Health Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="CPU Usage"
          value={`${data.serverMetrics.cpu.current.toFixed(1)}%`}
          secondaryValue="24 cores active"
          icon={Server}
          status={data.serverMetrics.cpu.current > 80 ? 'critical' : data.serverMetrics.cpu.current > 60 ? 'warning' : 'normal'}
        />
        <MetricCard
          title="Memory Usage"
          value={`${data.serverMetrics.memory.current.toFixed(1)}%`}
          secondaryValue="28.5 GB used"
          icon={Activity}
          status={data.serverMetrics.memory.current > 85 ? 'critical' : data.serverMetrics.memory.current > 70 ? 'warning' : 'normal'}
        />
        <MetricCard
          title="Response Time"
          value={`${data.serverMetrics.responseTime.current.toFixed(0)}ms`}
          secondaryValue="Avg over last hour"
          icon={Activity}
          status={data.serverMetrics.responseTime.current > 300 ? 'critical' : data.serverMetrics.responseTime.current > 200 ? 'warning' : 'normal'}
        />
        <MetricCard
          title="Error Rate"
          value={`${data.errorRates.total} errors`}
          secondaryValue="Last 24 hours"
          icon={AlertTriangle}
          status={data.errorRates.total > 50 ? 'critical' : data.errorRates.total > 20 ? 'warning' : 'normal'}
        />
      </div>

      {/* Real-time Performance Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-white dark:bg-gray-900 transition-colors">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-semibold dark:text-white transition-colors">Request Rate</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Requests per second</span>
              </div>
              <div className="text-2xl font-bold dark:text-white">
                {data.requestsData.requestsPerSecond.toFixed(0)} rps
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.requestsData.history}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    dataKey="timestamp"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
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
                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900 transition-colors">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-semibold dark:text-white transition-colors">Regional Latency</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Average response time by region</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.regionPerformance}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    dataKey="region"
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
                  <Bar dataKey="latency" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Endpoints Table */}
      <Card className="bg-white dark:bg-gray-900 transition-colors">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Top Endpoints</h3>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Endpoint</th>
                  <th className="px-6 py-3">Calls</th>
                  <th className="px-6 py-3">Avg. Latency</th>
                </tr>
              </thead>
              <tbody>
                {data.topEndpoints.map((endpoint) => (
                  <tr 
                    key={endpoint.endpoint}
                    className="border-t dark:border-gray-800"
                  >
                    <td className="px-6 py-4 font-medium dark:text-white">
                      {endpoint.endpoint}
                    </td>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {endpoint.calls.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {endpoint.avgLatency.toFixed(0)}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};