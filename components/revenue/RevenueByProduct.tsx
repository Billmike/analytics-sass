/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const RevenueByProduct = ({ data }: any) => {
  const { theme } = useTheme();

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
        <h3 className="text-base font-semibold dark:text-white mb-6">Revenue by Product</h3>
        <div className="space-y-6">
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
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    color: theme === 'dark' ? '#FFFFFF' : '#000000'
                  }}
                  formatter={(value) => [formatCurrency(Number(value)), '']}
                />
                <Bar dataKey="revenue" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-4">
            {data.map((product: any) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white">{product.name}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.users.toLocaleString()} active users
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium dark:text-white">
                    {formatCurrency(product.revenue)}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    {product.growth > 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={product.growth > 0 ? 'text-green-500' : 'text-red-500'}>
                      {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};