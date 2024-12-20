/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Moon, 
  Sun, 
  Users, 
  BarChart3, 
  ShoppingCart,
  Settings,
  Target,
  Zap,
  LifeBuoy,
  FileText,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/lib/context/ThemeContext';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavGroup = ({ title, children }: any) => (
  <div className="space-y-1">
    <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium px-4 py-2">
      {title}
    </h3>
    {children}
  </div>
);

const NavItem = ({ icon: Icon, label, href = '', isActive = false, badge = null }: any) => (
  <Link href={href}>
    <div className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors
      ${isActive 
        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400">
          {badge}
        </span>
      )}
    </div>
  </Link>
);

export const SideNav = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen border-r p-4 bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-6">
        <div className="w-8 h-8 bg-teal-600 rounded-lg"></div>
        <span className="font-semibold text-xl dark:text-white">Tener</span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 space-y-6 py-4">
        <NavGroup title="Core">
          <NavItem 
            icon={LayoutDashboard} 
            label="Overview" 
            href="/"
            isActive={pathname === '/'} 
          />
          <NavItem 
            icon={BarChart3} 
            label="Performance" 
            href="/performance"
            isActive={pathname === '/performance'}
            badge="Live" 
          />
          <NavItem icon={PieChart} label="Analytics" href="/analytics" />
          <NavItem icon={Target} label="Campaigns" href="/campaigns" />
        </NavGroup>

        <NavGroup title="Business">
          <NavItem icon={Users} label="Customers" href="/customers" />
          <NavItem 
            icon={ShoppingCart} 
            label="Sales" 
            href="/sales"
            badge="New" 
          />
          <NavItem icon={ArrowUpRight} label="Growth" href="/growth" />
          <NavItem icon={Zap} label="Automation" href="/automation" />
        </NavGroup>

        <Separator className="my-4" />

        <NavGroup title="Reports">
          <NavItem icon={FileText} label="Revenue Report" href="/reports/revenue" />
          <NavItem icon={FileText} label="Customer Report" href="/reports/customers" />
        </NavGroup>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 pt-4 border-t dark:border-gray-800">
        <NavItem icon={LifeBuoy} label="Help & Support" href="/support" />
        <NavItem icon={Settings} label="Settings" href="/settings" />
        
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <Sun className="w-4 h-4 dark:text-gray-400" />
            ) : (
              <Moon className="w-4 h-4 dark:text-gray-400" />
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
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
