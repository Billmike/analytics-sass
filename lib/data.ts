export const generateMockData = (timeRange: string) => {
  // Calculate number of data points based on time range
  const getDataPoints = (range: string) => {
    switch (range) {
      case '1m': return 30;
      case '3m': return 90;
      case '6m': return 180;
      case '1y': return 365;
      default: return 180;
    }
  };

  const dataPoints = getDataPoints(timeRange);
  const dates = Array.from({ length: dataPoints }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (dataPoints - i));
    return date;
  });

  // Group dates by month for monthly view
  const monthlyDates = dates.reduce((acc, date) => {
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(date);
    return acc;
  }, {} as Record<string, Date[]>);

  const months = Object.keys(monthlyDates);

  // Generate revenue data with realistic trends
  const revenueData = months.map(month => ({
    name: month,
    value: Math.floor(40000 + Math.random() * 20000),
  }));

  // Generate user engagement data
  const userEngagement = months.map(month => ({
    name: month,
    'Daily Active Users': Math.floor(800 + Math.random() * 400),
    'Weekly Active Users': Math.floor(1800 + Math.random() * 600),
    'Monthly Active Users': Math.floor(2800 + Math.random() * 800),
  }));

  // Generate retention data based on time range
  const retentionPeriods = timeRange === '1m' ? 4 : timeRange === '3m' ? 12 : 24;
  const retentionData = Array.from({ length: retentionPeriods }, (_, i) => ({
    week: `Week ${i + 1}`,
    retention: Math.max(100 - (i * (Math.random() * 2 + 3)), 60),
  }));

  return {
    revenueData,
    userEngagement,
    featureUsage: [
      { name: 'Dashboard', users: Math.floor(75 + Math.random() * 20) },
      { name: 'Analytics', users: Math.floor(55 + Math.random() * 20) },
      { name: 'Reports', users: Math.floor(35 + Math.random() * 20) },
      { name: 'API Access', users: Math.floor(25 + Math.random() * 10) },
      { name: 'Integrations', users: Math.floor(20 + Math.random() * 10) },
    ],
    userSegments: [
      { name: 'Enterprise', value: 30 },
      { name: 'SMB', value: 45 },
      { name: 'Startup', value: 25 },
    ],
    retentionData,
  };
};