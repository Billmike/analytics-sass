// lib/performanceData.ts
interface PerformanceMetrics {
  timeRange: string;
  filters?: {
    platforms?: string[];
    metrics?: string[];
  };
}

export const generatePerformanceData = (options: PerformanceMetrics) => {
  const generateTimeSeriesData = (base: number, volatility: number, points: number) => {
    return Array.from({ length: points }, (_, i) => ({
      timestamp: new Date(Date.now() - (points - i) * 60000),
      value: base + Math.random() * volatility - volatility / 2
    }));
  };

  return {
    serverMetrics: {
      cpu: {
        current: 45 + Math.random() * 30,
        history: generateTimeSeriesData(45, 30, 60)
      },
      memory: {
        current: 65 + Math.random() * 20,
        history: generateTimeSeriesData(65, 20, 60)
      },
      responseTime: {
        current: 250 + Math.random() * 150,
        history: generateTimeSeriesData(250, 150, 60)
      }
    },
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
      history: generateTimeSeriesData(850, 150, 60)
    },
    regionPerformance: [
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