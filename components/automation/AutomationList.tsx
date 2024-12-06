/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Pagination } from "../common";
import { NewAutomation } from "./NewAutomation";

interface AutomationListProps {
  automations: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateAutomation: (newAutomation: any) => void
}

const ITEMS_PER_PAGE = 10;

const StatusBadge = ({ status }: any) => {
  const colors = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
    Paused: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    Draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
  } as any;

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

export const AutomationList = ({ automations, searchQuery, setSearchQuery, onCreateAutomation }: AutomationListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(automations.length / ITEMS_PER_PAGE);

  // Get current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return automations.slice(startIndex, endIndex);
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold dark:text-white">All Automations</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, automations.length)} of {automations.length} automations
          </p>
          <div className="flex items-center gap-4">
            <div className="w-72">
              <Input
                placeholder="Search automations..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full"
              />
            </div>
            <NewAutomation onCreateAutomation={onCreateAutomation} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b dark:border-gray-800">
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Success Rate</th>
                <th className="pb-3 font-medium">Executions</th>
                <th className="pb-3 font-medium">Last Run</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {getCurrentPageData().map((automation) => (
                <tr key={automation.id} className="text-sm">
                  <td className="py-4">
                    <div className="font-medium dark:text-white">{automation.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">{automation.id}</div>
                  </td>
                  <td className="py-4 dark:text-gray-300">{automation.type}</td>
                  <td className="py-4">
                    <StatusBadge status={automation.status} />
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {automation.successRate.toFixed(1)}%
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {automation.executions.toLocaleString()}
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {automation.lastRun ? automation.lastRun.toLocaleString() : '-'}
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
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
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Card>
  );
};