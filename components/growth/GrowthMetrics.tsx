/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  trend: number;
  icon: any;
  prefix?: string;
  suffix?: string;
}

const MetricCard = ({ title, value, trend, icon: Icon, prefix = '', suffix = '' }: MetricCardProps) => (
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

export const GrowthMetrics = ({ data }: any) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Monthly Recurring Revenue"
        value={data.mrr.current}
        trend={data.mrr.trend}
        icon={DollarSign}
        prefix="$"
      />
      <MetricCard
        title="Annual Recurring Revenue"
        value={data.arr.current}
        trend={data.arr.trend}
        icon={DollarSign}
        prefix="$"
      />
      <MetricCard
        title="Growth Rate"
        value={data.growthRate.current}
        trend={data.growthRate.trend}
        icon={TrendingUp}
        suffix="%"
      />
      <MetricCard
        title="Customer Acquisition Cost"
        value={data.cac.current}
        trend={data.cac.trend}
        icon={Users}
        prefix="$"
      />
    </div>
  );
};