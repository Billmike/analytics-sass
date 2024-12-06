"use client";

import React, { useState, useEffect } from 'react';
import { generateSupportData } from '@/lib/data/supportData';
import { SupportOverview, TicketList, SupportAnalytics } from '@/components/support';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Support () {
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(generateSupportData({ timeRange }));
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'Medium',
    category: 'Technical'
  });

  useEffect(() => {
    setData(generateSupportData({ timeRange }));
  }, [timeRange]);

  const handleExport = () => {
    const reportData = {
      overview: data.overview,
      ticketsByStatus: data.ticketsByStatus,
      ticketsByPriority: data.ticketsByPriority,
      ticketVolume: data.ticketVolume,
      satisfaction: data.satisfaction,
      timeRange,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `support-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCreateTicket = () => {
    // In a real app, this would make an API call
    const newTicketData = {
      ...newTicket,
      id: `TKT-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
      status: 'Open',
      created: new Date(),
      lastUpdated: new Date(),
      customer: 'Current User' // In real app, this would be the logged-in user
    };

    setData(prev => ({
      ...prev,
      recentTickets: [newTicketData, ...prev.recentTickets]
    }));

    setNewTicketOpen(false);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'Medium',
      category: 'Technical'
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Help & Support</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage support tickets and track performance metrics
          </p>
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

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Support Data</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Add your filter controls here */}
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <SupportOverview data={data} />

      {/* Main Content */}
      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <TicketList 
            tickets={data.recentTickets}
            onCreate={() => setNewTicketOpen(true)}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <SupportAnalytics data={data} />
        </TabsContent>
      </Tabs>

      {/* New Ticket Dialog */}
      <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new support ticket.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter ticket subject"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your issue"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Feature Request">Feature Request</SelectItem>
                    <SelectItem value="Account">Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTicket}>Create Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
