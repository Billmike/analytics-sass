interface CustomerReportOptions {
  timeRange: string;
  filters?: {
    segments?: string[];
    status?: string[];
  };
}

export const generateCustomerReportData = (options: CustomerReportOptions) => {
  const { timeRange } = options;

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

  return {
    overview: {
      totalCustomers: {
        current: 12543 + Math.floor(Math.random() * 1000),
        previous: 11234 + Math.floor(Math.random() * 1000),
        trend: 11.6
      },
      activeUsers: {
        current: 8976 + Math.floor(Math.random() * 500),
        previous: 8123 + Math.floor(Math.random() * 500),
        trend: 10.5
      },
      customerLifetimeValue: {
        current: 890 + Math.random() * 100,
        previous: 780 + Math.random() * 100,
        trend: 14.1
      },
      retentionRate: {
        current: 92 + Math.random() * 5,
        previous: 89 + Math.random() * 5,
        trend: 3.4
      }
    },
    growth: {
      newCustomers: generateTimeSeriesData(150, 30),
      churnedCustomers: generateTimeSeriesData(20, 8),
      netGrowth: generateTimeSeriesData(130, 25)
    },
    segments: [
      { name: 'Enterprise', count: 234, revenue: 456000, growth: 15.3 },
      { name: 'Mid-Market', count: 567, revenue: 678000, growth: 12.7 },
      { name: 'SMB', count: 1234, revenue: 345000, growth: 8.9 },
      { name: 'Startup', count: 789, revenue: 123000, growth: 18.2 }
    ],
    engagement: {
      daily: generateTimeSeriesData(5000, 1000),
      weekly: generateTimeSeriesData(8000, 1500),
      monthly: generateTimeSeriesData(12000, 2000)
    },
    retentionCohorts: Array.from({ length: 6 }, (_, monthIndex) => ({
      cohort: new Date(Date.now() - (5 - monthIndex) * 30 * 24 * 60 * 60 * 1000),
      size: 1000 + Math.floor(Math.random() * 500),
      retentionData: Array.from({ length: 6 }, (_, i) => ({
        month: i + 1,
        rate: Math.max(0, 100 - (i * (10 + Math.random() * 5)))
      }))
    })),
    customerJourney: {
      acquisition: {
        channels: [
          { name: 'Organic Search', value: 35 },
          { name: 'Direct', value: 25 },
          { name: 'Referral', value: 20 },
          { name: 'Social', value: 15 },
          { name: 'Paid Search', value: 5 }
        ],
        conversion: {
          visitToSignup: 12 + Math.random() * 3,
          signupToPaid: 35 + Math.random() * 5
        }
      },
      satisfaction: {
        nps: 45 + Math.random() * 10,
        csat: 85 + Math.random() * 5,
        reviews: [
          { rating: 5, count: 456 },
          { rating: 4, count: 234 },
          { rating: 3, count: 89 },
          { rating: 2, count: 34 },
          { rating: 1, count: 12 }
        ]
      },
      support: {
        averageResponseTime: 2.5 + Math.random(),
        ticketsResolved: 456 + Math.floor(Math.random() * 100),
        satisfactionRate: 92 + Math.random() * 5,
        topIssues: [
          { issue: 'Login Problems', count: 45 },
          { issue: 'Billing Questions', count: 34 },
          { issue: 'Feature Requests', count: 28 },
          { issue: 'Technical Issues', count: 23 },
          { issue: 'Account Setup', count: 15 }
        ]
      }
    }
  };
};