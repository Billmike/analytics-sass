/* eslint-disable @typescript-eslint/no-explicit-any */
// components/growth/GrowthCharts.tsx
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const RevenueChart = ({ data }: any) => {
  const { theme } = useTheme();
  
  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <h3 className="text-base font-semibold dark:text-white mb-6">Revenue Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                  color: theme === 'dark' ? '#FFFFFF' : '#000000'
                }}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563EB" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export const ChannelMetrics = ({ data }: any) => {
  const { theme } = useTheme();

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <h3 className="text-base font-semibold dark:text-white mb-6">Channel Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
              />
              <XAxis 
                dataKey="name"
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              />
              <YAxis 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                tickFormatter={(value) => `${value.toFixed(1)}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                  color: theme === 'dark' ? '#FFFFFF' : '#000000'
                }}
              />
              <Bar dataKey="conversion" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export const AcquisitionChart = ({ data }: any) => {
  const { theme } = useTheme();

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <h3 className="text-base font-semibold dark:text-white mb-6">Customer Acquisition</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                nameKey="source"
                label={({ source, percentage }) => `${source}: ${percentage}%`}
              >
                {data.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                  color: theme === 'dark' ? '#FFFFFF' : '#000000'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};