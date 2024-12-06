/* eslint-disable @typescript-eslint/no-explicit-any */
// components/customer-report/CustomerSatisfaction.tsx
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { useTheme } from '@/lib/context/ThemeContext';
import { Star, TrendingUp, Users, MessageCircle } from 'lucide-react';

const RATING_COLORS = {
  5: '#22C55E', // Green
  4: '#84CC16', // Light Green
  3: '#EAB308', // Yellow
  2: '#EF4444', // Red
  1: '#991B1B'  // Dark Red
} as any;

export const CustomerSatisfaction = ({ data }: any) => {
  const { theme } = useTheme();
  const { reviews, nps, csat } = data;

  const totalReviews = reviews.reduce((sum: number, item: any) => sum + item.count, 0);
  const averageRating = reviews.reduce((sum: number, item: any) => sum + (item.rating * item.count), 0) / totalReviews;

  // Calculate percentage for each rating
  const ratingsWithPercentage = reviews.map((review: any) => ({
    ...review,
    percentage: (review.count / totalReviews) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Overall Satisfaction */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</h3>
            </div>
            <div className="text-3xl font-bold dark:text-white">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">out of 5.0</div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">NPS Score</h3>
            </div>
            <div className="text-3xl font-bold dark:text-white">{nps.toFixed(1)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Net Promoter Score</div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CSAT Score</h3>
            </div>
            <div className="text-3xl font-bold dark:text-white">{csat.toFixed(1)}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customer Satisfaction</div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reviews</h3>
            </div>
            <div className="text-3xl font-bold dark:text-white">{totalReviews.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customer Reviews</div>
          </div>
        </Card>
      </div>

      {/* Ratings Distribution */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Ratings Distribution</h3>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Bar Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingsWithPercentage} layout="vertical">
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    horizontal={false}
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis 
                    type="number"
                    tickFormatter={(value) => `${value}%`}
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <YAxis 
                    dataKey="rating"
                    type="category"
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
                    formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Reviews']}
                  />
                  <Bar dataKey="percentage">
                    {ratingsWithPercentage.map((entry: any) => (
                      <Cell key={entry.rating} fill={RATING_COLORS[entry.rating]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-4">
              {ratingsWithPercentage
                .sort((a: any, b: any) => b.rating - a.rating)
                .map((rating: any) => (
                <div key={rating.rating} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: rating.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" fill="#FACC15" />
                        ))}
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {rating.count.toLocaleString()} reviews
                      </span>
                    </div>
                    <span className="font-medium dark:text-white">
                      {rating.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${rating.percentage}%`,
                        backgroundColor: RATING_COLORS[rating.rating]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* NPS Trends */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">NPS Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.npsTrend}>
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
    </div>
  );
};