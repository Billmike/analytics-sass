/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const RevenueStreams = ({ data }: any) => {
  const { theme } = useTheme();
  
  // Merge all streams into single data points
  const mergedData = Object.keys(data)[0] ? data[Object.keys(data)[0]].map((item: any, index: any) => ({
    date: item.date,
    ...Object.keys(data).reduce((acc, key) => ({
      ...acc,
      [key]: data[key][index].value
    }), {})
  })) : [];

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <h3 className="text-base font-semibold dark:text-white mb-6">Revenue Streams</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mergedData}>
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
                formatter={(value) => [formatCurrency(Number(value)), '']}
              />
              <Legend />
              {Object.keys(data).map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};