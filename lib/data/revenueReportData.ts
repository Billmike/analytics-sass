interface RevenueReportOptions {
  timeRange: string;
  filters?: {
    products?: string[];
    channels?: string[];
  };
}

export const generateRevenueReportData = (options: RevenueReportOptions) => {
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
    summary: {
      totalRevenue: {
        current: Number(Number(254890 + Math.random() * 50000).toFixed(2)),
        previous: Number(Number(234567 + Math.random() * 50000).toFixed(2)),
        trend: 8.7
      },
      recurringRevenue: {
        current: Number(Number(198765 + Math.random() * 40000).toFixed(2)),
        previous: Number(Number(187654 + Math.random() * 40000).toFixed(2)),
        trend: 5.9
      },
      averageOrderValue: {
        current: Number(Number(125 + Math.random() * 20).toFixed(2)),
        previous: Number(Number(115 + Math.random() * 20).toFixed(2)),
        trend: 8.2
      },
      customerLifetimeValue: {
        current: Number(Number(850 + Math.random() * 100).toFixed(2)),
        previous: Number(Number(780 + Math.random() * 100).toFixed(2)),
        trend: 9.1
      }
    },
    revenueStreams: {
      subscriptions: generateTimeSeriesData(150000, 30000),
      oneTime: generateTimeSeriesData(50000, 10000),
      services: generateTimeSeriesData(25000, 5000),
      addOns: generateTimeSeriesData(15000, 3000)
    },
    revenueByProduct: [
      { name: 'Basic Plan', revenue: 98765, users: 789, growth: 12.3 },
      { name: 'Pro Plan', revenue: 156789, users: 456, growth: 15.7 },
      { name: 'Enterprise Plan', revenue: 234567, users: 123, growth: 18.9 },
      { name: 'Add-on Services', revenue: 45678, users: 234, growth: 9.4 },
      { name: 'Custom Solutions', revenue: 78901, users: 89, growth: 11.2 }
    ],
    revenueByRegion: [
      { region: 'North America', revenue: 156789, percentage: 35 },
      { region: 'Europe', revenue: 123456, percentage: 28 },
      { region: 'Asia Pacific', revenue: 98765, percentage: 22 },
      { region: 'Latin America', revenue: 45678, percentage: 10 },
      { region: 'Africa & ME', revenue: 23456, percentage: 5 }
    ],
    customerSegments: {
      newVsExisting: {
        new: { revenue: 98765, percentage: 35 },
        existing: { revenue: 183456, percentage: 65 }
      },
      bySize: [
        { segment: 'Enterprise', revenue: 156789, percentage: 40 },
        { segment: 'Mid-Market', revenue: 98765, percentage: 25 },
        { segment: 'SMB', revenue: 78901, percentage: 20 },
        { segment: 'Startup', revenue: 58901, percentage: 15 }
      ]
    },
    monthlyRecurring: {
      current: generateTimeSeriesData(180000, 20000),
      churn: generateTimeSeriesData(5000, 1000),
      expansion: generateTimeSeriesData(15000, 3000),
      net: generateTimeSeriesData(190000, 25000)
    },
    revenueQuality: {
      recurring: { percentage: 78, trend: 5.2 },
      contractedARR: { percentage: 85, trend: 3.8 },
      grossMargin: { percentage: 72, trend: 2.4 },
      customerRetention: { percentage: 94, trend: 1.8 }
    }
  };
};