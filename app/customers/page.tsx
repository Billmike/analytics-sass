/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, TrendingUp, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { generateCustomersData } from '@/lib/data/customerData';
import { useTheme } from '@/lib/context/ThemeContext';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Customers (){
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(generateCustomersData({ timeRange }));

  useEffect(() => {
    setData(generateCustomersData({ timeRange }));
  }, [timeRange]);

  const MetricCard = ({ title, value, trend, icon: Icon, prefix = '', suffix = '' }: any) => (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {trend > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <div className={`text-xs px-2 py-1 rounded ${
            trend > 0 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
          }`}>
            {Math.abs(trend).toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const StatusBadge = ({ status }: any) => {
    const colors = {
      Active: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
      Inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400',
      Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400'
    } as any;

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const SegmentBadge = ({ segment }: any) => {
    const colors = {
      New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
      Returning: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
      VIP: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400',
      'At Risk': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
      Churned: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
    } as any;

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colors[segment]}`}>
        {segment}
      </span>
    );
  };

  const filteredCustomers = data.customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Customers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and analyze your customer base</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {timeRange === '7d' ? 'Last 7 days' : 
                 timeRange === '30d' ? 'Last 30 days' : 
                 'Last 90 days'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Customers"
          value={data.overview.totalCustomers.value}
          trend={data.overview.totalCustomers.trend}
          icon={Users}
        />
        <MetricCard
          title="Active Customers"
          value={data.overview.activeCustomers.value}
          trend={data.overview.activeCustomers.trend}
          icon={Target}
        />
        <MetricCard
          title="Average Lifetime Value"
          value={data.overview.averageLifetimeValue.value}
          trend={data.overview.averageLifetimeValue.trend}
          icon={DollarSign}
          prefix="$"
        />
        <MetricCard
          title="Retention Rate"
          value={data.overview.retentionRate.value.toFixed(1)}
          trend={data.overview.retentionRate.trend}
          icon={TrendingUp}
          suffix="%"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Customer Growth</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.customerGrowth}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
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

        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Segment Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.segmentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.segmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Customer List */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-semibold dark:text-white">All Customers</h3>
            <div className="w-72">
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                // prefix={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b dark:border-gray-800">
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Segment</th>
                  <th className="pb-3 font-medium">Total Spent</th>
                  <th className="pb-3 font-medium">Orders</th>
                  <th className="pb-3 font-medium">Last Purchase</th>
                  <th className="pb-3 font-medium">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="text-sm">
                    <td className="py-4">
                      <div>
                        <div className="font-medium dark:text-white">{customer.name}</div>
                        <div className="text-gray-500 dark:text-gray-400">{customer.email}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="py-4">
                      <SegmentBadge segment={customer.segment} />
                    </td>
                    <td className="py-4 dark:text-gray-300">
                      ${customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-4 dark:text-gray-300">
                      {customer.ordersCount}
                    </td>
                    <td className="py-4 dark:text-gray-300">
                      {customer.lastPurchase ? 
                        customer.lastPurchase.toLocaleDateString() : '-'}
                    </td>
                    <td className="py-4 dark:text-gray-300">
                      {customer.joinDate.toLocaleDateString()}
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