import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Users, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Dashboard = () => {
  // Sample data - this would come from your API
  const [metrics] = useState({
    activeUsers: 1248,
    activeUsersChange: 12.2,
    revenue: 54200,
    revenueChange: -2.4,
    newSignups: 384,
    newSignupsChange: 8.1,
    churnRate: 2.8,
    churnRateChange: -0.5
  });

  const [revenueData] = useState([
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 48000 },
    { name: 'Mar', value: 51000 },
    { name: 'Apr', value: 54200 },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MetricCard = ({ title, value, change, icon: Icon }: any) => (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === 'number' && value >= 1000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value}
        </div>
        <div className="flex items-center space-x-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <p className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          change={metrics.activeUsersChange}
          icon={Users}
        />
        <MetricCard
          title="Revenue"
          value={metrics.revenue}
          change={metrics.revenueChange}
          icon={CreditCard}
        />
        <MetricCard
          title="New Signups"
          value={metrics.newSignups}
          change={metrics.newSignupsChange}
          icon={CalendarDays}
        />
        <MetricCard
          title="Churn Rate"
          value={`${metrics.churnRate}%`}
          change={metrics.churnRateChange}
          icon={Users}
        />
      </div>

      <Card className="p-4">
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
