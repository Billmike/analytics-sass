"use client";

import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateSalesData } from '@/lib/data/salesData';
import { SalesMetrics, SalesCharts, OrdersTable, PaymentAnalytics } from '@/components/sales';

export default function Sales() {
  const [timeRange, setTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(generateSalesData({ timeRange }));

  useEffect(() => {
    setData(generateSalesData({ timeRange }));
  }, [timeRange]);

  const handleExport = () => {
    // Convert data to CSV or Excel format
    const csvData = data.orders.map(order => ({
      id: order.id,
      customer: order.customerName,
      status: order.status,
      category: order.category,
      items: order.items,
      total: order.total,
      date: order.date.toLocaleDateString()
    }));

    // Create CSV content
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${timeRange}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredOrders = data.orders.filter(order => 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Sales</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monitor your sales performance and trends</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {timeRange === '7d' ? 'Last 7 days' : 
                 timeRange === '30d' ? 'Last 30 days' : 
                 'Last 90 days'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <SalesMetrics data={data.overview} />

      {/* Charts */}
      <SalesCharts data={data} />

      {/* Orders Table */}
      <OrdersTable 
        orders={filteredOrders}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Payment Analytics */}
      <PaymentAnalytics 
        paymentMethods={data.paymentMethods}
        topProducts={data.topProducts}
      />
    </div>
  );
};
