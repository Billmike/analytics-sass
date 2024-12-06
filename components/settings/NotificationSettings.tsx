/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { 
  Bell,
  Mail,
  Calendar,
  Shield,
  AlertCircle
} from 'lucide-react';

interface NotificationSettingsProps {
  settings: {
    emailNotifications: boolean;
    dailyReports: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
    supportAlerts: boolean;
    securityAlerts: boolean;
  };
  onUpdate: (settings: any) => void;
}

export const NotificationSettings = ({ settings, onUpdate }: NotificationSettingsProps) => {
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate(formData);
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been successfully updated.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const notificationItems = [
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: Mail,
      value: formData.emailNotifications,
    },
    {
      id: 'dailyReports',
      title: 'Daily Reports',
      description: 'Receive daily summary reports',
      icon: Calendar,
      value: formData.dailyReports,
    },
    {
      id: 'weeklyReports',
      title: 'Weekly Reports',
      description: 'Receive weekly performance reports',
      icon: Calendar,
      value: formData.weeklyReports,
    },
    {
      id: 'monthlyReports',
      title: 'Monthly Reports',
      description: 'Receive monthly analytics reports',
      icon: Calendar,
      value: formData.monthlyReports,
    },
    {
      id: 'supportAlerts',
      title: 'Support Alerts',
      description: 'Get notified about support ticket updates',
      icon: Bell,
      value: formData.supportAlerts,
    },
    {
      id: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Receive security-related notifications',
      icon: Shield,
      value: formData.securityAlerts,
    },
  ];

  return (
    <Card className="bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-white">Notification Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your notification preferences and communication settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Alert Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Important Note</p>
              <p>You will always receive critical system notifications and security alerts regardless of these settings.</p>
            </div>
          </div>

          {/* Notification Toggles */}
          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <item.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium dark:text-white">{item.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={item.value}
                  onCheckedChange={(checked) => handleToggle(item.id, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
};