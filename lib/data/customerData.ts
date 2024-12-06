interface CustomerOptions {
  timeRange: string;
  filters?: {
    segment?: string[];
    status?: string[];
  };
}

export const generateCustomersData = (options: CustomerOptions) => {
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

  const segments = ['New', 'Returning', 'VIP', 'At Risk', 'Churned'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  const countries = ['USA', 'UK', 'Germany', 'France', 'Canada', 'Australia', 'Japan'];

  const generateCustomer = (id: number) => {
    const segment = segments[Math.floor(Math.random() * segments.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const isActive = status === 'Active';

    return {
      id: `CUS${String(id).padStart(5, '0')}`,
      name: `Customer ${id}`,
      email: `customer${id}@example.com`,
      status,
      segment,
      country,
      totalSpent: isActive ? Math.floor(1000 + Math.random() * 9000) : 0,
      lastPurchase: isActive ? 
        new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) : 
        null,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
      ordersCount: isActive ? Math.floor(5 + Math.random() * 20) : 0,
      averageOrderValue: isActive ? Math.floor(100 + Math.random() * 400) : 0
    };
  };

  const getCustomers = () => {
    const allCustomers = Array.from({ length: 100 }, (_, i) => generateCustomer(i + 1));

    if (filters?.segment?.length || filters?.status?.length) {
      return allCustomers.filter(customer => {
        const segmentMatch = !filters.segment?.length || filters.segment.includes(customer.segment);
        const statusMatch = !filters.status?.length || filters.status.includes(customer.status);
        return segmentMatch && statusMatch;
      });
    }

    return allCustomers;
  };

  const customers = getCustomers();
  const activeCustomers = customers.filter(c => c.status === 'Active');

  return {
    overview: {
      totalCustomers: {
        value: customers.length,
        trend: 12.5
      },
      activeCustomers: {
        value: activeCustomers.length,
        trend: 8.3
      },
      averageLifetimeValue: {
        value: activeCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / activeCustomers.length,
        trend: 15.2
      },
      retentionRate: {
        value: (activeCustomers.length / customers.length) * 100,
        trend: 3.7
      }
    },
    customerGrowth: generateTimeSeriesData(1000, 200),
    segmentDistribution: segments.map(segment => ({
      name: segment,
      value: customers.filter(c => c.segment === segment).length,
      percentageChange: Math.random() * 20 - 10
    })),
    geographicDistribution: countries.map(country => ({
      country,
      customers: customers.filter(c => c.country === country).length,
      revenue: customers
        .filter(c => c.country === country)
        .reduce((sum, c) => sum + c.totalSpent, 0)
    })),
    customers: customers.sort((a, b) => b.totalSpent - a.totalSpent),
    recentActivity: customers
      .filter(c => c.lastPurchase)
      .sort((a, b) => {
        if (a.lastPurchase && b.lastPurchase) {
          return b.lastPurchase.getTime() - a.lastPurchase.getTime()
        }

        return 0
      })
      .slice(0, 10),
    lifetimeValue: {
      distribution: generateTimeSeriesData(500, 100),
      bySegment: segments.map(segment => ({
        segment,
        value: Math.floor(500 + Math.random() * 2000)
      }))
    }
  };
};