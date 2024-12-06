interface SalesOptions {
  timeRange: string;
  filters?: {
    category?: string[];
    status?: string[];
  };
}

export const generateSalesData = (options: SalesOptions) => {
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

  const statuses = ['Completed', 'Pending', 'Processing', 'Refunded'];
  const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Books'];
  const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Crypto'];

  const generateOrder = (id: number) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    const baseAmount = 50 + Math.random() * 450;
    const tax = baseAmount * 0.1;
    const shipping = 10 + Math.random() * 20;
    const total = baseAmount + tax + shipping;

    return {
      id: `ORD${String(id).padStart(5, '0')}`,
      customerName: `Customer ${id}`,
      status,
      category,
      paymentMethod,
      items: Math.floor(1 + Math.random() * 5),
      subtotal: baseAmount,
      tax,
      shipping,
      total,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    };
  };

  const getOrders = () => {
    const allOrders = Array.from({ length: 100 }, (_, i) => generateOrder(i + 1));

    if (filters?.category?.length || filters?.status?.length) {
      return allOrders.filter(order => {
        const categoryMatch = !filters.category?.length || filters.category.includes(order.category);
        const statusMatch = !filters.status?.length || filters.status.includes(order.status);
        return categoryMatch && statusMatch;
      });
    }

    return allOrders;
  };

  const orders = getOrders();
  const completedOrders = orders.filter(o => o.status === 'Completed');

  return {
    overview: {
      totalRevenue: {
        value: completedOrders.reduce((sum, order) => sum + order.total, 0),
        trend: 15.2
      },
      averageOrderValue: {
        value: completedOrders.reduce((sum, order) => sum + order.total, 0) / completedOrders.length,
        trend: 8.4
      },
      totalOrders: {
        value: orders.length,
        trend: 12.3
      },
      conversionRate: {
        value: (completedOrders.length / orders.length) * 100,
        trend: 5.7
      }
    },
    revenueTimeline: generateTimeSeriesData(50000, 15000),
    categoryBreakdown: categories.map(category => ({
      name: category,
      revenue: orders
        .filter(order => order.category === category)
        .reduce((sum, order) => sum + order.total, 0),
      orders: orders.filter(order => order.category === category).length
    })),
    paymentMethods: paymentMethods.map(method => ({
      method,
      value: orders
        .filter(order => order.paymentMethod === method)
        .reduce((sum, order) => sum + order.total, 0),
      count: orders.filter(order => order.paymentMethod === method).length
    })),
    orders: orders.sort((a, b) => b.date.getTime() - a.date.getTime()),
    topProducts: categories.map(category => ({
      category,
      sales: Math.floor(1000 + Math.random() * 9000),
      revenue: Math.floor(10000 + Math.random() * 90000)
    })),
    recentTransactions: orders
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10)
  };
};