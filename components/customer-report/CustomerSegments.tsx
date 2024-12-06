/* eslint-disable @typescript-eslint/no-explicit-any */
// components/customer-report/CustomerSegments.tsx
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const CustomerSegments = ({ data }: any) => {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);

  const totalRevenue = data.reduce((sum: number, segment: any) => sum + segment.revenue, 0);
  // const totalCustomers = data.reduce((sum, segment) => sum + segment.count, 0);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Customer Segments</h3>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Revenue Distribution */}
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Revenue Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="revenue"
                      label={({ name, revenue }) => 
                        `${name}: ${((revenue / totalRevenue) * 100).toFixed(1)}%`
                      }
                    >
                      {data.map((_: any, index: number) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Distribution */}
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Customer Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical">
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      horizontal={false}
                      stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                    />
                    <XAxis 
                      type="number"
                      stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category"
                      stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                        borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                        color: theme === 'dark' ? '#FFFFFF' : '#000000'
                      }}
                    />
                    <Bar dataKey="count" fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Metrics */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Segment Details</h3>
          <div className="space-y-6">
            {data.map((segment: any, index: number) => (
              <div 
                key={segment.name}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium dark:text-white">{segment.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {segment.count.toLocaleString()} customers
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-right">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                    <div className="font-medium dark:text-white">{formatCurrency(segment.revenue)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Growth</div>
                    <div className="flex items-center justify-end gap-1">
                      {segment.growth > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${
                        segment.growth > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {Math.abs(segment.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((segment: any) => (
          <Card key={segment.name} className="bg-white dark:bg-gray-900">
            <div className="p-6">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">{segment.name}</h3>
              <div className="mt-2 space-y-2">
                <div className="text-2xl font-bold dark:text-white">
                  ${(segment.revenue / segment.count).toFixed(0)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Avg. Revenue per Customer
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};