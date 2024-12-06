/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Sun,
  Moon,
  Monitor,
  Maximize2,
  PlayCircle,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '@/lib/context/ThemeContext';

interface DisplaySettingsProps {
  settings: {
    defaultTheme: 'light' | 'dark';
    compactMode: boolean;
    animationsEnabled: boolean;
    showTips: boolean;
  };
  onUpdate: (settings: any) => void;
}

export const DisplaySettings = ({ settings, onUpdate }: DisplaySettingsProps) => {
  const { theme, toggleTheme } = useTheme();
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
        title: "Display settings updated",
        description: "Your display preferences have been successfully updated.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update display settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const displayItems = [
    {
      id: 'theme',
      title: 'Theme Mode',
      description: 'Choose between light and dark theme',
      icon: theme === 'dark' ? Moon : Sun,
      customControl: (
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
          <Moon className="w-4 h-4" />
        </div>
      )
    },
    {
      id: 'compactMode',
      title: 'Compact Mode',
      description: 'Reduce spacing and padding in the interface',
      icon: Maximize2,
      value: formData.compactMode,
    },
    {
      id: 'animationsEnabled',
      title: 'Enable Animations',
      description: 'Show animations and transitions',
      icon: PlayCircle,
      value: formData.animationsEnabled,
    },
    {
      id: 'showTips',
      title: 'Show Tips',
      description: 'Display helpful tips and suggestions',
      icon: HelpCircle,
      value: formData.showTips,
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-white">Display Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize the appearance and behavior of your interface
          </p>
        </div>

        {/* Preview Card */}
        <Card className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed">
          <div className="p-6 text-center space-y-2">
            <Monitor className="w-8 h-8 mx-auto text-gray-400" />
            <h3 className="font-medium dark:text-white">Preview</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Changes will be previewed here
            </p>
          </div>
        </Card>

        {/* Display Options */}
        <div className="space-y-6">
          {displayItems.map((item) => (
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
              {item.customControl || (
                <Switch
                  checked={item.value}
                  onCheckedChange={(checked) => handleToggle(item.id, checked)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-lg">
          <p className="text-sm">
            Some settings may require a page refresh to take full effect.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData(settings)}
          >
            Reset to Defaults
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  );
};