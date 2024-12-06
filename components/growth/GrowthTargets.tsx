/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
};

const TargetCard = ({ title, current, target, progress }: any) => (
  <Card className="bg-white dark:bg-gray-900">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
      <Target className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="dark:text-gray-400">Current</span>
          <span className="font-medium dark:text-white">{formatCurrency(current)}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="dark:text-gray-400">Target</span>
          <span className="font-medium dark:text-white">{formatCurrency(target)}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const GrowthTargets = ({ targets }: any) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(targets).map(([key, value]) => (
        <TargetCard
          key={key}
          title={key.split(/(?=[A-Z])/).join(' ')}
          {...value as any}
        />
      ))}
    </div>
  );
};