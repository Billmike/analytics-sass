interface AutomationOptions {
  timeRange: string;
  filters?: {
    status?: string[];
    type?: string[];
  };
}

export const generateAutomationData = (options: AutomationOptions) => {
  const { timeRange, filters } = options;

  const getDataPoints = () => {
    switch (timeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  const automationTypes = ['Email', 'Notification', 'Task', 'Workflow', 'Integration'];
  const statuses = ['Active', 'Paused', 'Draft', 'Failed'];

  const generateTimeSeriesData = (baseValue: number, variance: number) => {
    const points = getDataPoints();
    return Array.from({ length: points }, (_, i) => ({
      date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000),
      value: baseValue + Math.random() * variance - variance / 2
    }));
  };

  const getFilteredAutomations = () => {
    const generateAutomation = (id: number) => {
      const type = automationTypes[Math.floor(Math.random() * automationTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const isActive = status === 'Active';

      return {
        id: `AUT${String(id).padStart(5, '0')}`,
        name: `Automation ${id}`,
        type,
        status,
        triggers: Math.floor(1 + Math.random() * 5),
        actions: Math.floor(2 + Math.random() * 8),
        executions: isActive ? Math.floor(100 + Math.random() * 900) : 0,
        successRate: isActive ? 85 + Math.random() * 15 : 0,
        lastRun: isActive ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000) : null,
        created: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      };
    };

    const allAutomations = Array.from({ length: 50 }, (_, i) => generateAutomation(i + 1));

    if (filters?.status?.length || filters?.type?.length) {
      return allAutomations.filter(automation => {
        const statusMatch = !filters.status?.length || filters.status.includes(automation.status);
        const typeMatch = !filters.type?.length || filters.type.includes(automation.type);
        return statusMatch && typeMatch;
      });
    }

    return allAutomations;
  };

  const automations = getFilteredAutomations();
  const activeAutomations = automations.filter(a => a.status === 'Active');

  return {
    overview: {
      totalAutomations: {
        value: automations.length,
        trend: 12.5,
        history: generateTimeSeriesData(50, 10)
      },
      activeAutomations: {
        value: activeAutomations.length,
        trend: 8.3
      },
      successRate: {
        value: activeAutomations.reduce((sum, a) => sum + a.successRate, 0) / activeAutomations.length,
        trend: 2.1
      },
      totalExecutions: {
        value: activeAutomations.reduce((sum, a) => sum + a.executions, 0),
        trend: 15.4
      }
    },
    performance: {
      executionsOverTime: generateTimeSeriesData(1000, 200),
      successRateOverTime: generateTimeSeriesData(95, 5),
      errorRateByType: automationTypes.map(type => ({
        type,
        errorRate: Math.random() * 10,
        total: Math.floor(1000 + Math.random() * 9000)
      }))
    },
    automations,
    recentActivity: Array.from({ length: 10 }, (_, i) => ({
      id: `ACT${String(i + 1).padStart(5, '0')}`,
      automationId: `AUT${String(Math.floor(Math.random() * 50) + 1).padStart(5, '0')}`,
      type: automationTypes[Math.floor(Math.random() * automationTypes.length)],
      status: Math.random() > 0.2 ? 'Success' : 'Failed',
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      details: 'Automation executed successfully'
    }))
  };
};