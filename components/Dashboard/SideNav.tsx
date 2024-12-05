// components/SideNav.tsx
import React from 'react';
import { LayoutDashboard, Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/lib/context/ThemeContext';

export const SideNav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 min-h-screen border-r p-4 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-2 px-4 py-6">
        <div className="w-8 h-8 bg-teal-600 rounded-lg"></div>
        <span className="font-semibold text-xl dark:text-white">Analytics</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <LayoutDashboard className="w-5 h-5 dark:text-gray-400" />
          <span className="font-medium dark:text-white">Overview</span>
        </div>
        
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <Sun className="w-5 h-5 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 dark:text-gray-400" />
            )}
            <span className="dark:text-gray-400">
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
};
