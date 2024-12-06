"use client";

import React, { useState, useEffect } from 'react';
import { generateRevenueReportData } from '@/lib/data/revenueReportData';
import { RevenueSummary, RevenueStreams, RevenueByProduct, RevenueByRegion, RevenueQuality } from '@/components/revenue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/lib/context/ThemeContext';

export default function RevenueReport() {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(generateRevenueReportData({ timeRange }));

  useEffect(() => {
    setData(generateRevenueReportData({ timeRange }));
  }, [timeRange]);

  const handleExport = () => {
    const reportData = {
      summary: data.summary,
      revenueStreams: data.revenueStreams,
      revenueByProduct: data.revenueByProduct,
      revenueByRegion: data.revenueByRegion,
      revenueQuality: data.revenueQuality,
      timeRange,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revenue-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Revenue Report</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Comprehensive overview of your revenue metrics
          </p>
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
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <RevenueSummary data={data.summary} />

      {/* Revenue Streams Chart */}
      <RevenueStreams data={data.revenueStreams} />

      {/* Revenue by Product and Region */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <RevenueByProduct data={data.revenueByProduct} />
        <RevenueByRegion data={data.revenueByRegion} />
      </div>

      {/* Revenue Quality Metrics */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <RevenueQuality data={data.revenueQuality} />
        
        {/* Monthly Recurring Revenue Chart */}
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Monthly Recurring Revenue</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyRecurring.current}>
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
                  <YAxis 
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    tickFormatter={(value) => `$${(value / 1000)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'MRR']}
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
      </div>
    </div>
  );
};
