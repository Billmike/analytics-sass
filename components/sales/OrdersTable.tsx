/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pagination } from "../common";

const ITEMS_PER_PAGE = 10;

const StatusBadge = ({ status }: any) => {
  const colors = {
    Completed: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    Processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
    Refunded: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
  } as any;

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export const OrdersTable = ({ orders, searchQuery, setSearchQuery }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  // Get current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return orders.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-semibold dark:text-white">Recent Orders</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, orders.length)} of {orders.length} orders
            </p>
          </div>
          <div className="w-72">
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b dark:border-gray-800">
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {getCurrentPageData().map((order: any) => (
                <tr key={order.id} className="text-sm">
                  <td className="py-4 dark:text-white">
                    {order.id}
                  </td>
                  <td className="py-4">
                    <div className="font-medium dark:text-white">{order.customerName}</div>
                  </td>
                  <td className="py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {order.category}
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {order.items}
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {order.date.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Card>
  );
};