interface CampaignOptions {
  timeRange: string;
  filters?: {
    status?: string[];
    type?: string[];
  };
}

export const generateCampaignsData = (options: CampaignOptions) => {
  const { timeRange, filters } = options;

  // Get number of data points based on time range
  const getDataPoints = () => {
    switch (timeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  const generateTimeSeriesData = (baseValue: number, variance: number) => {
    const points = getDataPoints();
    return Array.from({ length: points }, (_, i) => ({
      date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000),
      value: baseValue + Math.random() * variance - variance / 2
    }));
  };

  const statuses = ['Active', 'Scheduled', 'Ended', 'Draft'];
  const types = ['Email', 'Social Media', 'PPC', 'Content'];

  const generateRandomCampaign = (id: string) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const isActive = status === 'Active';
    const budget = 3000 + Math.floor(Math.random() * 7000);

    return {
      id,
      name: `Campaign ${id}`,
      type,
      status,
      budget,
      spent: isActive ? budget * (0.3 + Math.random() * 0.5) : 0,
      reach: isActive ? Math.floor(budget * (5 + Math.random() * 5)) : 0,
      conversions: isActive ? Math.floor(budget * (0.05 + Math.random() * 0.05)) : 0,
      roi: isActive ? 1.5 + Math.random() : 0,
      startDate: isActive ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : null,
      endDate: isActive ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) : null,
      performance: isActive ? generateTimeSeriesData(300, 100) : []
    };
  };

  const getCampaigns = () => {
    const allCampaigns = Array.from({ length: 10 }, (_, i) => 
      generateRandomCampaign(`CAM${String(i + 1).padStart(3, '0')}`)
    );

    if (filters?.status?.length || filters?.type?.length) {
      return allCampaigns.filter(campaign => {
        const statusMatch = !filters.status?.length || filters.status.includes(campaign.status);
        const typeMatch = !filters.type?.length || filters.type.includes(campaign.type);
        return statusMatch && typeMatch;
      });
    }

    return allCampaigns;
  };

  const campaigns = getCampaigns();
  const activeCampaigns = campaigns.filter(c => c.status === 'Active');

  return {
    overview: {
      totalCampaigns: {
        value: campaigns.length,
        trend: 2
      },
      activeCampaigns: {
        value: activeCampaigns.length,
        trend: 1
      },
      totalBudget: {
        value: campaigns.reduce((sum, camp) => sum + camp.budget, 0),
        trend: 15
      },
      averageROI: {
        value: activeCampaigns.reduce((sum, camp) => sum + camp.roi, 0) / 
               (activeCampaigns.length || 1),
        trend: 0.3
      }
    },
    campaigns,
    performanceSummary: {
      totalReach: generateTimeSeriesData(50000, 10000),
      totalConversions: generateTimeSeriesData(1000, 200),
      averageROI: generateTimeSeriesData(2.0, 0.5)
    },
    channelPerformance: types.map(type => ({
      channel: type,
      effectiveness: 60 + Math.random() * 30,
      budget: 8000 + Math.random() * 10000,
      roi: 1.5 + Math.random() * 1.5
    }))
  };
};