interface GrowthOptions {
  timeRange: string;
  filters?: {
    metrics?: string[];
    channels?: string[];
  };
}

export const generateGrowthData = (options: GrowthOptions) => {
  const { timeRange, filters } = options;

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

  const channels = ['Organic', 'Paid Search', 'Social Media', 'Email', 'Referral'];
  const allMetrics = {
    mrr: {
      current: Number(Number(125000 + Math.random() * 10000).toFixed(2)),
      trend: 15.8,
      history: generateTimeSeriesData(125000, 10000)
    },
    arr: {
      current: Number(Number(1500000 + Math.random() * 100000).toFixed(2)),
      trend: 22.4,
      history: generateTimeSeriesData(1500000, 100000)
    },
    growthRate: {
      current: Number(Number(18.5 + Math.random() * 5).toFixed(2)),
      trend: 2.3,
      history: generateTimeSeriesData(18.5, 5)
    },
    cac: {
      current: Number(Number(250 + Math.random() * 50).toFixed(2)),
      trend: -5.2,
      history: generateTimeSeriesData(250, 50)
    }
  };

  // Filter metrics if specified
  const getFilteredMetrics = () => {
    if (filters?.metrics?.length) {
      return Object.fromEntries(
        Object.entries(allMetrics).filter(([key]) => 
          filters.metrics?.includes(key)
        )
      );
    }
    return allMetrics;
  };

  // Filter channels if specified
  const getFilteredChannels = () => {
    const availableChannels = filters?.channels?.length ? 
      channels.filter(channel => filters.channels?.includes(channel)) : 
      channels;

    return availableChannels.map(channel => ({
      name: channel,
      users: Math.floor(1000 + Math.random() * 9000),
      conversion: 2 + Math.random() * 8,
      revenue: Math.floor(10000 + Math.random() * 90000),
      growth: Math.floor(-10 + Math.random() * 40)
    }));
  };

  return {
    overview: getFilteredMetrics(),
    channelMetrics: getFilteredChannels(),
    customerAcquisition: {
      timeline: generateTimeSeriesData(500, 100),
      bySource: getFilteredChannels().map(channel => ({
        source: channel.name,
        value: Math.floor(100 + Math.random() * 900),
        percentage: Math.floor(5 + Math.random() * 35)
      }))
    },
    revenueMetrics: {
      expansion: generateTimeSeriesData(50000, 10000),
      churn: generateTimeSeriesData(10000, 2000),
      newBusiness: generateTimeSeriesData(30000, 8000),
      netRevenue: generateTimeSeriesData(70000, 15000)
    },
    cohortAnalysis: Array.from({ length: 6 }, (_, i) => ({
      cohort: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000),
      size: Math.floor(500 + Math.random() * 500),
      retentionRate: Array.from({ length: 6 }, (_, j) => ({
        month: j + 1,
        rate: Math.max(0, 100 - (j * (10 + Math.random() * 5)))
      }))
    })),
    targets: {
      mrr: {
        current: 125000,
        target: 150000,
        progress: 83.3
      },
      customers: {
        current: 1200,
        target: 1500,
        progress: 80
      },
      acquisitionCost: {
        current: 250,
        target: 200,
        progress: 75
      },
      revenueGrowth: {
        current: 18.5,
        target: 25,
        progress: 74
      }
    }
  };
};