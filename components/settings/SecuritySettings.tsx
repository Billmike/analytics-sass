/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Shield,
  Lock,
  Clock,
  Key,
  Trash2,
  Plus,
  RefreshCw
} from 'lucide-react';

interface SecuritySettingsProps {
  settings: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiration: number;
    ipWhitelist: string[];
    lastPasswordChange: Date;
    lastSecurityAudit: Date;
  };
  onUpdate: (settings: any) => void;
}

export const SecuritySettings = ({ settings, onUpdate }: SecuritySettingsProps) => {
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [newIpAddress, setNewIpAddress] = useState('');

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddIpAddress = () => {
    if (newIpAddress && !formData.ipWhitelist.includes(newIpAddress)) {
      handleChange('ipWhitelist', [...formData.ipWhitelist, newIpAddress]);
      setNewIpAddress('');
    }
  };

  const handleRemoveIpAddress = (ip: string) => {
    handleChange('ipWhitelist', formData.ipWhitelist.filter(item => item !== ip));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate(formData);
      toast({
        title: "Security settings updated",
        description: "Your security settings have been successfully updated.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update security settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateAuditReport = async () => {
    toast({
      title: "Security audit initiated",
      description: "The security audit report will be generated shortly.",
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-white">Security Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure your security preferences and access controls
          </p>
        </div>

        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <div className="font-medium dark:text-white">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </div>
              </div>
            </div>
            <Switch
              checked={formData.twoFactorAuth}
              onCheckedChange={(checked) => handleChange('twoFactorAuth', checked)}
            />
          </div>

          {/* Session Timeout */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Session Timeout (minutes)
            </Label>
            <Input
              type="number"
              value={formData.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
              min={5}
              max={120}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Automatically log out after period of inactivity
            </p>
          </div>

          {/* Password Expiration */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Password Expiration (days)
            </Label>
            <Input
              type="number"
              value={formData.passwordExpiration}
              onChange={(e) => handleChange('passwordExpiration', parseInt(e.target.value))}
              min={30}
              max={365}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Require password change every specified number of days
            </p>
          </div>

          {/* IP Whitelist */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              IP Whitelist
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter IP address"
                value={newIpAddress}
                onChange={(e) => setNewIpAddress(e.target.value)}
              />
              <Button type="button" onClick={handleAddIpAddress}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.ipWhitelist.map((ip) => (
                <div key={ip} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <span className="text-sm dark:text-gray-300">{ip}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveIpAddress(ip)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
            <h3 className="font-medium dark:text-white">Security Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last Password Change</span>
                <Badge variant={
                  new Date().getTime() - formData.lastPasswordChange.getTime() > formData.passwordExpiration * 24 * 60 * 60 * 1000
                    ? "destructive"
                    : "default"
                }>
                  {formData.lastPasswordChange.toLocaleDateString()}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last Security Audit</span>
                <Badge>
                  {formData.lastSecurityAudit.toLocaleDateString()}
                </Badge>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={generateAuditReport}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Security Audit Report
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t dark:border-gray-800">
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