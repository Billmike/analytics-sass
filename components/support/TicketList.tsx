/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from '../common/Pagination';
import { Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const StatusBadge = ({ status }: any) => {
  const colors = {
    'Open': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
    'In Progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    'Waiting': 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400',
    'Resolved': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
    'Closed': 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400'
  } as any;

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: any) => {
  const colors = {
    'Critical': 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
    'High': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400',
    'Medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    'Low': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
  } as any;

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[priority]}`}>
      {priority}
    </span>
  );
};

export const TicketList = ({ tickets, onCreate = () => {} }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Apply filters
  const filteredTickets = tickets.filter((ticket: any) => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTickets.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6">
        {/* Header and Filters */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold dark:text-white">Support Tickets</h3>
            <Button onClick={onCreate}>
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Waiting">Waiting</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                  <SelectItem value="Account">Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead className="border-b dark:border-gray-800">
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-3 font-medium">Ticket</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {getCurrentPageData().map((ticket: any) => (
                <tr key={ticket.id} className="text-sm">
                  <td className="py-4">
                    <div className="font-medium dark:text-white">{ticket.subject}</div>
                    <div className="text-gray-500 dark:text-gray-400">{ticket.id}</div>
                  </td>
                  <td className="py-4 dark:text-gray-300">{ticket.customer}</td>
                  <td className="py-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="py-4">
                    <PriorityBadge priority={ticket.priority} />
                  </td>
                  <td className="py-4 dark:text-gray-300">{ticket.category}</td>
                  <td className="py-4 dark:text-gray-300">
                    {ticket.created.toLocaleDateString()}
                  </td>
                  <td className="py-4 dark:text-gray-300">
                    {ticket.lastUpdated.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </Card>
  );
};