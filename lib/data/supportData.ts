interface SupportOptions {
  timeRange: string;
  filters?: {
    category?: string[];
    priority?: string[];
  };
}

export const generateSupportData = (options: SupportOptions) => {
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
      totalTickets: {
        value: 1234 + Math.floor(Math.random() * 200),
        trend: 5.2
      },
      openTickets: {
        value: 234 + Math.floor(Math.random() * 50),
        trend: -2.8
      },
      avgResponseTime: {
        value: 2.5 + Math.random(),
        trend: -8.4
      },
      satisfactionScore: {
        value: 92 + Math.random() * 5,
        trend: 3.2
      }
    },
    ticketsByStatus: [
      { status: 'Open', count: 234 },
      { status: 'In Progress', count: 156 },
      { status: 'Waiting', count: 89 },
      { status: 'Resolved', count: 567 },
      { status: 'Closed', count: 876 }
    ],
    ticketsByPriority: [
      { priority: 'Critical', count: 23 },
      { priority: 'High', count: 78 },
      { priority: 'Medium', count: 234 },
      { priority: 'Low', count: 167 }
    ],
    recentTickets: Array.from({ length: 50 }, (_, i) => ({
      id: `TKT-${String(i + 1).padStart(5, '0')}`,
      subject: `Support Ticket ${i + 1}`,
      customer: `Customer ${i + 1}`,
      status: ['Open', 'In Progress', 'Waiting', 'Resolved', 'Closed'][Math.floor(Math.random() * 5)],
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
      category: ['Technical', 'Billing', 'Feature Request', 'Account'][Math.floor(Math.random() * 4)],
      created: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      lastUpdated: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000)
    })),
    ticketVolume: generateTimeSeriesData(100, 30),
    responseTime: generateTimeSeriesData(2.5, 1),
    categoriesDistribution: [
      { category: 'Technical', percentage: 45 },
      { category: 'Billing', percentage: 25 },
      { category: 'Feature Request', percentage: 20 },
      { category: 'Account', percentage: 10 }
    ],
    satisfaction: {
      timeline: generateTimeSeriesData(90, 10),
      ratings: [
        { rating: 5, count: 456 },
        { rating: 4, count: 234 },
        { rating: 3, count: 89 },
        { rating: 2, count: 34 },
        { rating: 1, count: 12 }
      ]
    }
  };
};