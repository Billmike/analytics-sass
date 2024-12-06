/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface QualityMetricProps {
  title: string;
  percentage: number;
  trend: number;
}

const QualityMetric = ({ title, percentage, trend }: QualityMetricProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium dark:text-white">{title}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium dark:text-white">{percentage}%</span>
        <div className="flex items-center">
          {trend > 0 ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
    </div>
    <Progress value={percentage} className="h-2" />
  </div>
);

export const RevenueQuality = ({ data }: any) => {
  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <h3 className="text-base font-semibold dark:text-white mb-6">Revenue Quality Metrics</h3>
        <div className="space-y-6">
          <QualityMetric
            title="Recurring Revenue"
            percentage={data.recurring.percentage}
            trend={data.recurring.trend}
          />
          <QualityMetric
            title="Contracted ARR"
            percentage={data.contractedARR.percentage}
            trend={data.contractedARR.trend}
          />
          <QualityMetric
            title="Gross Margin"
            percentage={data.grossMargin.percentage}
            trend={data.grossMargin.trend}
          />
          <QualityMetric
            title="Customer Retention"
            percentage={data.customerRetention.percentage}
            trend={data.customerRetention.trend}
          />
        </div>
      </div>
    </Card>
  );
};