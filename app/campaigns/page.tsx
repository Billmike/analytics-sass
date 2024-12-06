/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  Target,
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { generateCampaignsData } from '@/lib/data/campaignsData';
import { useTheme } from '@/lib/context/ThemeContext';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateCampaignModal } from '@/components/forms/CreateCampaignModal';

export default function Campaigns () {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(generateCampaignsData({ timeRange }));

  useEffect(() => {
    setData(generateCampaignsData({ timeRange }));
  }, [timeRange]);

  const handleCreateCampaign = (newCampaign: any) => {
    setData(prevData => ({
      ...prevData,
      campaigns: [newCampaign, ...prevData.campaigns],
      overview: {
        ...prevData.overview,
        totalCampaigns: {
          value: prevData.overview.totalCampaigns.value + 1,
          trend: ((prevData.overview.totalCampaigns.value + 1) / prevData.overview.totalCampaigns.value - 1) * 100
        },
        activeCampaigns: {
          value: prevData.overview.activeCampaigns.value + 1,
          trend: ((prevData.overview.activeCampaigns.value + 1) / prevData.overview.activeCampaigns.value - 1) * 100
        },
        totalBudget: {
          value: prevData.overview.totalBudget.value + newCampaign.budget,
          trend: ((prevData.overview.totalBudget.value + newCampaign.budget) / prevData.overview.totalBudget.value - 1) * 100
        }
      }
    }));
  };

  const MetricCard = ({ title, value, trend, icon: Icon, prefix = '' }: any) => (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
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
      Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
      Ended: 'bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400',
      Draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    } as any;

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Campaigns</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your marketing campaigns</p>
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
          <CreateCampaignModal onCreateCampaign={handleCreateCampaign} />
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Campaigns"
          value={data.overview.totalCampaigns.value}
          trend={data.overview.totalCampaigns.trend}
          icon={Megaphone}
        />
        <MetricCard
          title="Active Campaigns"
          value={data.overview.activeCampaigns.value}
          trend={data.overview.activeCampaigns.trend}
          icon={Target}
        />
        <MetricCard
          title="Total Budget"
          value={data.overview.totalBudget.value}
          trend={data.overview.totalBudget.trend}
          icon={DollarSign}
          prefix="$"
        />
        <MetricCard
          title="Average ROI"
          value={data.overview.averageROI.value.toFixed(1)}
          trend={data.overview.averageROI.trend}
          icon={TrendingUp}
          prefix="+"
        />
      </div>

      {/* Campaign Performance Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Conversion Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.performanceSummary.totalConversions}>
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
            <h3 className="text-base font-semibold dark:text-white mb-6">Channel Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.channelPerformance}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    dataKey="channel"
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
                  />
                  <Bar dataKey="effectiveness" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Campaigns Table */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">All Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b dark:border-gray-800">
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                  <th className="pb-3 font-medium">Campaign</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Budget</th>
                  <th className="pb-3 font-medium">ROI</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {data.campaigns.map((campaign) => (
                  <tr key={campaign.id} className="text-sm">
                    <td className="py-4">
                      <div>
                        <div className="font-medium dark:text-white">{campaign.name}</div>
                        <div className="text-gray-500 dark:text-gray-400">{campaign.id}</div>
                      </div>
                    </td>
                    <td className="py-4 dark:text-gray-300">{campaign.type}</td>
                    <td className="py-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="py-4 dark:text-gray-300">${campaign.budget.toLocaleString()}</td>
                    <td className="py-4 dark:text-gray-300">
                      {campaign.roi ? `+${campaign.roi.toFixed(1)}` : '-'}
                    </td>
                    <td className="py-4 dark:text-gray-300">
                      {campaign.startDate ? 
                        campaign.startDate.toLocaleDateString() : '-'}
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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