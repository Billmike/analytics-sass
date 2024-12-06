/* eslint-disable @typescript-eslint/no-explicit-any */
// components/customer-report/CustomerGrowthCharts.tsx
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';

const COLORS = {
  newCustomers: '#0088FE',
  churnedCustomers: '#FF4842',
  netGrowth: '#00C49F'
};

export const CustomerGrowthCharts = ({ data }: any) => {
  const { theme } = useTheme();

  // Merge all growth data into single data points for the chart
  const mergedData = data.newCustomers.map((item: any, index: number) => ({
    date: item.date,
    'New Customers': data.newCustomers[index].value,
    'Churned Customers': data.churnedCustomers[index].value,
    'Net Growth': data.netGrowth[index].value
  }));

  const formatTooltipValue = (value: number) => {
    if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toFixed(0);
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-base font-semibold dark:text-white">Customer Growth</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">New vs Churned Customers</p>
          </div>
          <div className="flex gap-6">
            {Object.entries({
              'New Customers': data.newCustomers[data.newCustomers.length - 1].value,
              'Churned Customers': data.churnedCustomers[data.churnedCustomers.length - 1].value,
              'Net Growth': data.netGrowth[data.netGrowth.length - 1].value
            }).map(([key, value]) => (
              <div key={key} className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{key}</p>
                <p className="text-base font-semibold dark:text-white">
                  {formatTooltipValue(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[400px]">
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
                tickFormatter={formatTooltipValue}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                  color: theme === 'dark' ? '#FFFFFF' : '#000000'
                }}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [formatTooltipValue(value as number), '']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="New Customers"
                stroke={COLORS.newCustomers}
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="Churned Customers"
                stroke={COLORS.churnedCustomers}
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="Net Growth"
                stroke={COLORS.netGrowth}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth Rate Chart */}
        <div className="mt-8">
          <div className="mb-6">
            <h3 className="text-base font-semibold dark:text-white">Growth Rate</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly growth percentage</p>
          </div>
          <div className="h-[300px]">
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
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    color: theme === 'dark' ? '#FFFFFF' : '#000000'
                  }}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="Net Growth"
                  stroke={COLORS.netGrowth}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};