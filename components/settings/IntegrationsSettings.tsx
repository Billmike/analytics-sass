/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  RefreshCw,
  Link2,
  Unlink,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Box,
  Wallet,
  Mail,
  BarChart2
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  lastSync?: Date;
  type: 'crm' | 'payment' | 'email' | 'analytics';
}

interface IntegrationsSettingsProps {
  integrations: Integration[];
  onUpdate: (integrations: Integration[]) => void;
}

export const IntegrationsSettings = ({ integrations, onUpdate }: IntegrationsSettingsProps) => {
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'crm':
        return Box;
      case 'payment':
        return Wallet;
      case 'email':
        return Mail;
      case 'analytics':
        return BarChart2;
      default:
        return Box;
    }
  };

  const handleSync = async (integrationId: string) => {
    setIsSyncing(integrationId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Sync completed",
        description: "Integration data has been successfully synchronized.",
      });
    } catch {
      toast({
        title: "Sync failed",
        description: "Failed to synchronize integration data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(null);
    }
  };

  const handleConnectionToggle = async (integration: Integration) => {
    setIsConnecting(integration.id);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedIntegrations: any = integrations.map(item => {
        if (item.id === integration.id) {
          return {
            ...item,
            status: item.status === 'connected' ? 'disconnected' : 'connected',
            lastSync: item.status === 'disconnected' ? new Date() : undefined
          };
        }
        return item;
      });
      
      onUpdate(updatedIntegrations);
      
      toast({
        title: integration.status === 'connected' ? "Disconnected" : "Connected",
        description: `Successfully ${integration.status === 'connected' ? 'disconnected from' : 'connected to'} ${integration.name}.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update integration status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(null);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-white">Integrations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your external service connections and integrations
          </p>
        </div>

        {/* Integrations List */}
        <div className="space-y-4">
          {integrations.map((integration) => {
            const Icon = getIntegrationIcon(integration.type);
            
            return (
              <div
                key={integration.id}
                className="p-4 border rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium dark:text-white">
                          {integration.name}
                        </h3>
                        <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                          {integration.status === 'connected' ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {integration.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {integration.status === 'connected' && integration.lastSync && (
                          `Last synced: ${integration.lastSync.toLocaleString()}`
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.status === 'connected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                        disabled={isSyncing === integration.id}
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${
                          isSyncing === integration.id ? 'animate-spin' : ''
                        }`} />
                        {isSyncing === integration.id ? 'Syncing...' : 'Sync'}
                      </Button>
                    )}
                    <Button
                      variant={integration.status === 'connected' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => handleConnectionToggle(integration)}
                      disabled={isConnecting === integration.id}
                    >
                      {integration.status === 'connected' ? (
                        <>
                          <Unlink className="w-4 h-4 mr-2" />
                          {isConnecting === integration.id ? 'Disconnecting...' : 'Disconnect'}
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4 mr-2" />
                          {isConnecting === integration.id ? 'Connecting...' : 'Connect'}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Integrations State */}
        {integrations.length === 0 && (
          <div className="text-center py-12">
            <Box className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium dark:text-white mb-2">
              No Integrations Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Get started by connecting your first integration
            </p>
          </div>
        )}

        {/* Add Integration Button */}
        <div className="flex justify-center pt-4 border-t dark:border-gray-800">
          <Button variant="outline" onClick={() => window.open('#', '_blank')}>
            <Link2 className="w-4 h-4 mr-2" />
            Add New Integration
          </Button>
        </div>
      </div>
    </Card>
  );
};