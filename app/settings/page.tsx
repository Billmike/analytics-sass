/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings, NotificationSettings, SecuritySettings, DisplaySettings, IntegrationsSettings, TeamManagement } from '@/components/settings';
import { generateSettingsData } from '@/lib/data/settingsData';
import { toast } from '@/hooks/use-toast';
import {
  Settings,
  Bell,
  Shield,
  Monitor,
  Link,
  Users
} from 'lucide-react';

export default function SettingsPage () {
  const [settings, setSettings] = useState(generateSettingsData() as any);
  
  const handleUpdateSettings = (section: string, data: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));

    toast({
      title: "Settings updated",
      description: `Your ${section} settings have been saved successfully.`
    });
  };

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: Settings,
      content: <GeneralSettings 
        settings={settings.general} 
        onUpdate={(data) => handleUpdateSettings('general', data)}
      />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      content: <NotificationSettings 
        settings={settings.notifications} 
        onUpdate={(data) => handleUpdateSettings('notifications', data)}
      />
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      content: <SecuritySettings 
        settings={settings.security} 
        onUpdate={(data) => handleUpdateSettings('security', data)}
      />
    },
    {
      id: 'display',
      label: 'Display',
      icon: Monitor,
      content: <DisplaySettings 
        settings={settings.display} 
        onUpdate={(data) => handleUpdateSettings('display', data)}
      />
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Link,
      content: <IntegrationsSettings 
        integrations={settings.integrations} 
        onUpdate={(data) => handleUpdateSettings('integrations', data)}
      />
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
      content: <TeamManagement 
        team={settings.team} 
        onUpdate={(data) => handleUpdateSettings('team', data)}
      />
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <div className="border-b dark:border-gray-800">
          <TabsList className="h-12 w-full justify-start gap-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="inline-flex items-center gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="space-y-4 focus:outline-none"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* Save Reminder */}
      <div className="fixed bottom-6 right-6">
        <div 
          className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          role="alert"
        >
          Changes are saved automatically
        </div>
      </div>
    </div>
  );
};
