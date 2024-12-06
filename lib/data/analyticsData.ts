interface AnalyticsOptions {
  timeRange: string;
  filters?: {
    channels?: string[];
    segments?: string[];
  };
}

export const generateAnalyticsData = (options: AnalyticsOptions) => {
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

  const points = getDataPoints();

  const generateTimeSeriesData = (baseValue: number, variance: number, points: number) => {
    return Array.from({ length: points }, (_, i) => ({
      date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000),
      value: baseValue + Math.random() * variance - variance / 2
    }));
  };

  // Filter traffic sources based on channels
  const getTrafficSources = () => {
    const allSources = [
      { source: 'Direct', sessions: 35000 + Math.random() * 5000, conversion: 3.2 },
      { source: 'Organic Search', sessions: 28000 + Math.random() * 5000, conversion: 2.8 },
      { source: 'Referral', sessions: 15000 + Math.random() * 3000, conversion: 4.1 },
      { source: 'Social', sessions: 12000 + Math.random() * 2000, conversion: 3.5 },
      { source: 'Email', sessions: 8000 + Math.random() * 1500, conversion: 4.8 }
    ];

    if (filters?.channels?.length) {
      return allSources.filter(source => filters.channels && filters.channels.includes(source.source));
    }
    return allSources;
  };

  // Filter user segments based on segment filter
  const getUserSegments = () => {
    const allSegments = [
      { name: 'New Users', value: 35, change: 2.3 },
      { name: 'Returning', value: 45, change: 5.1 },
      { name: 'Inactive', value: 20, change: -3.4 }
    ];

    if (filters?.segments?.length) {
      return allSegments.filter(segment => filters.segments && filters.segments.includes(segment.name));
    }
    return allSegments;
  };

  return {
    keyMetrics: {
      activeUsers: {
        current: 12500 + Math.floor(Math.random() * 2500),
        trend: 8.5,
        history: generateTimeSeriesData(12500, 2500, points)
      },
      engagement: {
        current: 65 + Math.random() * 10,
        trend: 4.2,
        history: generateTimeSeriesData(65, 10, points)
      },
      conversionRate: {
        current: 3.2 + Math.random(),
        trend: -0.8,
        history: generateTimeSeriesData(3.2, 1, points)
      },
      averageSessionTime: {
        current: 245 + Math.random() * 30,
        trend: 12.3,
        history: generateTimeSeriesData(245, 30, points)
      }
    },
    userSegments: getUserSegments(),
    trafficSources: getTrafficSources(),
    userBehavior: {
      pageViews: generateTimeSeriesData(25000, 5000, points),
      bounceRate: generateTimeSeriesData(45, 10, points),
      exitPages: [
        { page: '/checkout', exits: 1200, rate: 15.2 },
        { page: '/pricing', exits: 850, rate: 12.8 },
        { page: '/product', exits: 720, rate: 9.5 },
        { page: '/blog', exits: 680, rate: 8.9 }
      ]
    },
    geographicData: [
      { country: 'United States', users: 45000, revenue: 125000 },
      { country: 'United Kingdom', users: 15000, revenue: 45000 },
      { country: 'Germany', users: 12000, revenue: 35000 },
      { country: 'France', users: 9000, revenue: 28000 },
      { country: 'Japan', users: 7500, revenue: 22000 }
    ],
    deviceAnalytics: {
      distribution: [
        { device: 'Mobile', share: 58, growth: 4.2 },
        { device: 'Desktop', share: 32, growth: -2.1 },
        { device: 'Tablet', share: 10, growth: -1.8 }
      ],
      performance: {
        mobile: { loadTime: 2.8, bounceRate: 42 },
        desktop: { loadTime: 1.9, bounceRate: 35 },
        tablet: { loadTime: 2.4, bounceRate: 38 }
      }
    }
  };
};