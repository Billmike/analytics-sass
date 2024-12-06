/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  current: number;
  previous: number;
  trend: number;
  icon: any;
  prefix?: string;
  suffix?: string;
}

const MetricCard = ({ title, current, previous, trend, icon: Icon, prefix = '', suffix = '' }: MetricCardProps) => (
  <Card className="bg-white dark:bg-gray-900">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold dark:text-white">
        {prefix}{typeof current === 'number' ? current.toLocaleString() : current}{suffix}
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
        <span className="text-xs text-gray-500 dark:text-gray-400">
          vs previous {prefix}{previous.toLocaleString()}{suffix}
        </span>
      </div>
    </CardContent>
  </Card>
);

export const RevenueSummary = ({ data }: any) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        current={data.totalRevenue.current}
        previous={data.totalRevenue.previous}
        trend={data.totalRevenue.trend}
        icon={DollarSign}
        prefix="$"
      />
      <MetricCard
        title="Recurring Revenue"
        current={data.recurringRevenue.current}
        previous={data.recurringRevenue.previous}
        trend={data.recurringRevenue.trend}
        icon={TrendingUp}
        prefix="$"
      />
      <MetricCard
        title="Average Order Value"
        current={data.averageOrderValue.current}
        previous={data.averageOrderValue.previous}
        trend={data.averageOrderValue.trend}
        icon={ShoppingCart}
        prefix="$"
      />
      <MetricCard
        title="Customer Lifetime Value"
        current={data.customerLifetimeValue.current}
        previous={data.customerLifetimeValue.previous}
        trend={data.customerLifetimeValue.trend}
        icon={Users}
        prefix="$"
      />
    </div>
  );
};