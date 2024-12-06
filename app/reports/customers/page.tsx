"use client";

import React, { useState, useEffect } from 'react';
import { generateCustomerReportData } from '@/lib/data/customerReportData';
import { CustomerOverview, CustomerGrowthCharts, CustomerJourney, CustomerSatisfaction, CustomerSegments, HeatMap } from '@/components/customer-report';
import { Download, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';

export default function CustomerReport (){
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(generateCustomerReportData({ timeRange }));

  useEffect(() => {
    setData(generateCustomerReportData({ timeRange }));
  }, [timeRange]);

  const handleExport = () => {
    const reportData = {
      overview: data.overview,
      growth: data.growth,
      segments: data.segments,
      engagement: data.engagement,
      journey: data.customerJourney,
      timeRange,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Customer Report</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Comprehensive analysis of customer behavior and metrics
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

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Filters</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Add your filter controls here */}
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <CustomerOverview data={data.overview} />

      {/* Main Content Tabs */}
      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-900">
          <TabsTrigger value="growth">Growth Analysis</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-6">
          <CustomerGrowthCharts data={data.growth} />
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <CustomerSegments data={data.segments} />
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <CustomerJourney data={data.customerJourney} />
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <CustomerSatisfaction data={data.customerJourney.satisfaction} />
        </TabsContent>
      </Tabs>

      {/* Custom Report Sections */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Retention Cohorts */}
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">Retention Cohorts</h3>
            <div className="h-[400px] overflow-scroll scroll-smooth">
              <ResponsiveContainer width="100%" height="100%">
                <HeatMap
                  data={data.retentionCohorts}
                  theme={theme}
                />
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Engagement Metrics */}
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <h3 className="text-base font-semibold dark:text-white mb-6">User Engagement</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.engagement.daily}>
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
                  />
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
      </div>
    </div>
  );
};
