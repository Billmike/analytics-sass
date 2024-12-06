/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Clock, CheckCircle, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';

const COLORS = {
  status: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#8B5CF6'],
  priority: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6']
};

interface MetricCardProps {
  title: string;
  value: number;
  trend: number;
  icon: any;
  prefix?: string;
  suffix?: string;
}

const MetricCard = ({ title, value, trend, icon: Icon, prefix = '', suffix = '' }: MetricCardProps) => (
  <Card className="bg-white dark:bg-gray-900">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold dark:text-white">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="flex items-center gap-2 mt-1">
        {trend > 0 ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <div className={`text-xs px-2 py-1 rounded ${
          trend > 0 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
        }`}>
          {Math.abs(trend).toFixed(1)}%
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SupportOverview = ({ data }: any) => {
  const { theme } = useTheme();
  const { overview, ticketsByStatus, ticketsByPriority, categoriesDistribution } = data;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Tickets"
          value={overview.totalTickets.value}
          trend={overview.totalTickets.trend}
          icon={Ticket}
        />
        <MetricCard
          title="Open Tickets"
          value={overview.openTickets.value}
          trend={overview.openTickets.trend}
          icon={CheckCircle}
        />
        <MetricCard
          title="Avg. Response Time"
          value={overview.avgResponseTime.value}
          trend={overview.avgResponseTime.trend}
          icon={Clock}
          suffix="h"
        />
        <MetricCard
          title="Satisfaction Score"
          value={overview.satisfactionScore.value}
          trend={overview.satisfactionScore.trend}
          icon={Star}
          suffix="%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Tickets by Status */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base font-medium">Tickets by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="count"
                    nameKey="status"
                  >
                    {ticketsByStatus.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS.status[index % COLORS.status.length]} />
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
            <div className="grid grid-cols-2 gap-4 mt-4">
              {ticketsByStatus.map((item: any, index: number) => (
                <div key={item.status} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.status[index % COLORS.status.length] }}
                  />
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{item.status}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">({item.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tickets by Priority */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base font-medium">Tickets by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketsByPriority}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="count"
                    nameKey="priority"
                  >
                    {ticketsByPriority.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS.priority[index % COLORS.priority.length]} />
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
            <div className="grid grid-cols-2 gap-4 mt-4">
              {ticketsByPriority.map((item: any, index: number) => (
                <div key={item.priority} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS.priority[index % COLORS.priority.length] }}
                  />
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{item.priority}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">({item.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories Distribution */}
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base font-medium">Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoriesDistribution.map((category: any) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{category.category}</span>
                    <span className="font-medium dark:text-white">{category.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};