/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';

export const SupportAnalytics = ({ data }: any) => {
  const { theme } = useTheme();
  const { ticketVolume, responseTime, satisfaction } = data;

  // Calculate average satisfaction rating
  const totalReviews = satisfaction.ratings.reduce((sum: number, item: any) => sum + item.count, 0);
  const avgRating = satisfaction.ratings.reduce((sum: number, item: any) => sum + (item.rating * item.count), 0) / totalReviews;

  return (
    <div className="space-y-6">
      {/* Ticket Volume Trends */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-semibold dark:text-white">Ticket Volume</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily ticket submissions</p>
            </div>
            <div className="text-2xl font-bold dark:text-white">
              {ticketVolume[ticketVolume.length - 1].value.toFixed(0)}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketVolume}>
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    color: theme === 'dark' ? '#FFFFFF' : '#000000'
                  }}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
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

      {/* Response Time Analysis */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-semibold dark:text-white">Response Time</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average response time in hours</p>
            </div>
            <div className="text-2xl font-bold dark:text-white">
              {responseTime[responseTime.length - 1].value.toFixed(1)}h
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTime}>
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    color: theme === 'dark' ? '#FFFFFF' : '#000000'
                  }}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value) => [`${Number(value).toFixed(1)}h`, 'Response Time']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Customer Satisfaction */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-semibold dark:text-white">Satisfaction Trend</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer satisfaction over time</p>
              </div>
              <div className="text-2xl font-bold dark:text-white">
                {satisfaction.timeline[satisfaction.timeline.length - 1].value.toFixed(1)}%
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfaction.timeline}>
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
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Satisfaction']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-semibold dark:text-white">Rating Distribution</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average Rating: {avgRating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfaction.ratings}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    dataKey="rating"
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#2563EB"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};