/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { generateAutomationData } from '@/lib/data/automationData';
import { AutomationMetrics, ExecutionsChart, ErrorRateChart, AutomationList, RecentActivity } from '@/components/automation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Automation = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(generateAutomationData({ timeRange }));

  useEffect(() => {
    setData(generateAutomationData({ timeRange }));
  }, [timeRange]);

  const filteredAutomations = data.automations.filter(automation => 
    automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    automation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    automation.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAutomation = (newAutomation: any) => {
    setData(prevData => ({
      ...prevData,
      automations: [newAutomation, ...prevData.automations],
      overview: {
        ...prevData.overview,
        totalAutomations: {
          ...prevData.overview.totalAutomations,
          value: prevData.overview.totalAutomations.value + 1,
          trend: ((prevData.overview.totalAutomations.value + 1) / prevData.overview.totalAutomations.value - 1) * 100
        },
        activeAutomations: {
          ...prevData.overview.activeAutomations,
          value: prevData.overview.activeAutomations.value + 1,
          trend: ((prevData.overview.activeAutomations.value + 1) / prevData.overview.activeAutomations.value - 1) * 100
        }
      }
    }));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Automation</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and monitor your automated workflows</p>
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

      <AutomationMetrics data={data.overview} />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ExecutionsChart data={data.performance.executionsOverTime} />
        <ErrorRateChart data={data.performance.errorRateByType} />
      </div>

      <AutomationList 
        automations={filteredAutomations}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateAutomation={handleCreateAutomation}
      />

      <RecentActivity activities={data.recentActivity} />
    </div>
  );
};

export default Automation;