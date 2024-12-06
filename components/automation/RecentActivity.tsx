/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from 'lucide-react';
import { Pagination } from '../common/Pagination';

const ITEMS_PER_PAGE = 10;

export const RecentActivity = ({ activities }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  // Get current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return activities.slice(startIndex, endIndex);
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-semibold dark:text-white">Recent Activity</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, activities.length)} of {activities.length} activities
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {getCurrentPageData().map((activity: any) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              {activity.status === 'Success' ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mt-1" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium dark:text-white truncate">
                    {activity.automationId}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activity.details}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'Success'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                  }`}>
                    {activity.status}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Card>
  );
};