/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Star, Clock, CheckCircle } from 'lucide-react';

const COLORS = {
  channels: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'],
  ratings: ['#22C55E', '#84CC16', '#EAB308', '#EF4444', '#991B1B']
};

export const CustomerJourney = ({ data }: any) => {
  const { acquisition, satisfaction, support } = data;

  const ratingData = satisfaction.reviews.sort((a: any, b: any) => b.rating - a.rating);
  const totalReviews = ratingData.reduce((sum: number, item: any) => sum + item.count, 0);
  const averageRating = ratingData.reduce((sum: number, item: any) => sum + (item.rating * item.count), 0) / totalReviews;

  return (
    <div className="space-y-6">
      {/* Acquisition Insights */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Customer Acquisition</h3>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Acquisition Channels */}
            <div>
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Acquisition Channels</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={acquisition.channels}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {acquisition.channels.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS.channels[index % COLORS.channels.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conversion Metrics */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Visit to Signup</div>
                  <div className="mt-1 text-2xl font-bold dark:text-white">{acquisition.conversion.visitToSignup.toFixed(1)}%</div>
                  <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded">
                    <div 
                      className="h-2 bg-blue-500 rounded" 
                      style={{ width: `${acquisition.conversion.visitToSignup}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Signup to Paid</div>
                  <div className="mt-1 text-2xl font-bold dark:text-white">{acquisition.conversion.signupToPaid.toFixed(1)}%</div>
                  <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded">
                    <div 
                      className="h-2 bg-green-500 rounded" 
                      style={{ width: `${acquisition.conversion.signupToPaid}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Customer Satisfaction */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Customer Satisfaction</h3>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Key Metrics */}
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Average Rating</span>
                </div>
                <div className="mt-2 text-3xl font-bold dark:text-white">{averageRating.toFixed(1)}/5.0</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">NPS Score</div>
                <div className="mt-2 text-3xl font-bold dark:text-white">{satisfaction.nps.toFixed(1)}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">CSAT Score</div>
                <div className="mt-2 text-3xl font-bold dark:text-white">{satisfaction.csat.toFixed(1)}%</div>
              </div>
            </div>

            {/* Ratings Distribution */}
            <div className="lg:col-span-2">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Ratings Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                      {ratingData.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS.ratings[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Support Metrics */}
      <Card className="bg-white dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-base font-semibold dark:text-white mb-6">Support Performance</h3>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Avg Response Time</span>
              </div>
              <div className="mt-2 text-2xl font-bold dark:text-white">{support.averageResponseTime.toFixed(1)} hours</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Tickets Resolved</span>
              </div>
              <div className="mt-2 text-2xl font-bold dark:text-white">{support.ticketsResolved}</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Satisfaction Rate</span>
              </div>
              <div className="mt-2 text-2xl font-bold dark:text-white">{support.satisfactionRate.toFixed(1)}%</div>
            </div>
          </div>

          {/* Top Issues */}
          <div>
            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Top Support Issues</h4>
            <div className="space-y-4">
              {support.topIssues.map((issue: any) => (
                <div 
                  key={issue.issue} 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span className="font-medium dark:text-white">{issue.issue}</span>
                  <span className="text-gray-500 dark:text-gray-400">{issue.count} tickets</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};