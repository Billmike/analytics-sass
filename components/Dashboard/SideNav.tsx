import React from 'react';
import { LayoutDashboard, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

export const SideNav = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r p-4">
      <div className="flex items-center gap-2 px-4 py-6">
        <div className="w-8 h-8 bg-teal-600 rounded-lg"></div>
        <span className="font-semibold text-xl">Analytics</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Overview</span>
        </div>
        
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5" />
            <span>Light Mode</span>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};
