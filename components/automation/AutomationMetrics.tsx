/* eslint-disable @typescript-eslint/no-explicit-any */

import { MetricCard } from '@/components/common/MetricCard';
import { Zap, Activity, CheckCircle, Play } from 'lucide-react';

export function AutomationMetrics ({ data }: any) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Automations"
        value={data.totalAutomations.value}
        trend={data.totalAutomations.trend}
        icon={Zap}
      />
      <MetricCard
        title="Active Automations"
        value={data.activeAutomations.value}
        trend={data.activeAutomations.trend}
        icon={Play}
      />
      <MetricCard
        title="Success Rate"
        value={data.successRate.value}
        trend={data.successRate.trend}
        icon={CheckCircle}
        suffix="%"
      />
      <MetricCard
        title="Total Executions"
        value={data.totalExecutions.value}
        trend={data.totalExecutions.trend}
        icon={Activity}
      />
    </div>
  );
};