/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MetricType {
  title: string;
  value: number | string;
  change: number;
  icon: any;
}

export interface MetricCardProps {
  title: string;
  value: number;
  trend: number;
  icon: any;
  prefix?: string;
  suffix?: string;
}