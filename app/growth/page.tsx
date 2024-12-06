"use client";

import React, { useState, useEffect } from 'react';
import { generateGrowthData } from '@/lib/data/growthData';
import { GrowthMetrics, GrowthTargets, RevenueChart, ChannelMetrics, AcquisitionChart } from '@/components/growth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Growth () {
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(generateGrowthData({ timeRange }));

  useEffect(() => {
    setData(generateGrowthData({ timeRange }));
  }, [timeRange]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Growth</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track your key growth metrics and targets</p>
        </div>
        <div>
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

      <GrowthMetrics data={data.overview} />
      <GrowthTargets targets={data.targets} />
      <RevenueChart data={data.overview.mrr.history} />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChannelMetrics data={data.channelMetrics} />
        <AcquisitionChart data={data.customerAcquisition.bySource} />
      </div>
    </div>
  );
};
