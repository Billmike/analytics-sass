/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const PaymentAnalytics = ({ paymentMethods, topProducts }: any) => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Payment Methods</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="method"
                  label={({ method, value }) => `${method}: $${(value / 1000).toFixed(1)}k`}
                >
                  {paymentMethods.map((_: any, index: any) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product: any) => (
              <div key={product.category} className="flex items-center justify-between">
                <div>
                  <div className="font-medium dark:text-white">{product.category}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.sales} sales
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium dark:text-white">
                    ${product.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};