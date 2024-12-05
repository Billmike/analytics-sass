interface PerformanceMetrics {
  timeRange: string;
  filters?: {
    platforms?: string[];
    metrics?: string[];
  };
}

export const generatePerformanceData = (options: PerformanceMetrics) => {
  const { timeRange, filters } = options;

  // Determine number of data points based on time range
  const getDataPoints = () => {
    switch (timeRange) {
      case '1h': return 60;    // 1 point per minute
      case '6h': return 360;   // 1 point per minute
      case '24h': return 288;  // 1 point per 5 minutes
      case '7d': return 168;   // 1 point per hour
      default: return 60;
    }
  };

  // Get time interval in milliseconds
  const getTimeInterval = () => {
    switch (timeRange) {
      case '1h': return 60000;    // 1 minute
      case '6h': return 60000;    // 1 minute
      case '24h': return 300000;  // 5 minutes
      case '7d': return 3600000;  // 1 hour
      default: return 60000;
    }
  };

  const points = getDataPoints();
  const interval = getTimeInterval();

  const generateTimeSeriesData = (base: number, volatility: number) => {
    return Array.from({ length: points }, (_, i) => ({
      timestamp: new Date(Date.now() - (points - i) * interval),
      value: base + Math.random() * volatility - volatility / 2
    }));
  };

  // Filter metrics if specified
  const getMetrics = () => {
    const allMetrics = {
      cpu: {
        current: 45 + Math.random() * 30,
        history: generateTimeSeriesData(45, 30)
      },
      memory: {
        current: 65 + Math.random() * 20,
        history: generateTimeSeriesData(65, 20)
      },
      responseTime: {
        current: 250 + Math.random() * 150,
        history: generateTimeSeriesData(250, 150)
      }
    };

    if (filters?.metrics?.length) {
      return Object.fromEntries(
        Object.entries(allMetrics).filter(([key]) => 
          filters.metrics?.includes(key)
        )
      );
    }

    return allMetrics;
  };

  return {
    serverMetrics: getMetrics(),
    errorRates: {
      total: Math.floor(Math.random() * 100),
      byType: [
        { type: '5xx', count: Math.floor(Math.random() * 40), trend: -5 },
        { type: '4xx', count: Math.floor(Math.random() * 50), trend: 2 },
        { type: 'Network', count: Math.floor(Math.random() * 30), trend: -8 },
        { type: 'API', count: Math.floor(Math.random() * 20), trend: 15 }
      ]
    },
    requestsData: {
      totalRequests: Math.floor(50000 + Math.random() * 10000),
      successRate: 98.5 + Math.random(),
      avgResponseTime: 245 + Math.random() * 50,
      requestsPerSecond: 850 + Math.random() * 150,
      history: generateTimeSeriesData(850, 150)
    },
    regionPerformance: filters?.platforms 
      ? [
          { region: 'North America', latency: 85 + Math.random() * 20, requests: 15000 + Math.random() * 5000 },
          { region: 'Europe', latency: 95 + Math.random() * 20, requests: 12000 + Math.random() * 5000 },
          { region: 'Asia', latency: 120 + Math.random() * 30, requests: 18000 + Math.random() * 5000 },
          { region: 'Oceania', latency: 150 + Math.random() * 30, requests: 5000 + Math.random() * 2000 }
        ].filter(region => filters.platforms?.includes(region.region))
      : [
          { region: 'North America', latency: 85 + Math.random() * 20, requests: 15000 + Math.random() * 5000 },
          { region: 'Europe', latency: 95 + Math.random() * 20, requests: 12000 + Math.random() * 5000 },
          { region: 'Asia', latency: 120 + Math.random() * 30, requests: 18000 + Math.random() * 5000 },
          { region: 'Oceania', latency: 150 + Math.random() * 30, requests: 5000 + Math.random() * 2000 }
        ],
    topEndpoints: [
      { endpoint: '/api/users', calls: 12500 + Math.random() * 2500, avgLatency: 120 + Math.random() * 50 },
      { endpoint: '/api/products', calls: 10000 + Math.random() * 2500, avgLatency: 150 + Math.random() * 50 },
      { endpoint: '/api/orders', calls: 8500 + Math.random() * 2500, avgLatency: 180 + Math.random() * 50 },
      { endpoint: '/api/analytics', calls: 7500 + Math.random() * 2500, avgLatency: 200 + Math.random() * 50 }
    ]
  };
};