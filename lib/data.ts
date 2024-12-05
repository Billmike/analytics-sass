/* eslint-disable @typescript-eslint/no-explicit-any */
interface FilterOptions {
  timeRange: string;
  dateRange: [Date | null, Date | null];
  selectedSegments: string[];
  selectedFeatures: string[];
  comparisonMode: boolean;
}

export const generateMockData = (options: FilterOptions) => {
  const { timeRange, dateRange, selectedSegments, selectedFeatures, comparisonMode } = options;

  // Get date range based on timeRange or custom dateRange
  const getDateRange = () => {
    if (timeRange === 'custom' && dateRange[0] && dateRange[1]) {
      return {
        start: dateRange[0],
        end: dateRange[1]
      };
    }

    const end = new Date();
    const start = new Date();
    switch (timeRange) {
      case '1m':
        start.setMonth(end.getMonth() - 1);
        break;
      case '3m':
        start.setMonth(end.getMonth() - 3);
        break;
      case '6m':
        start.setMonth(end.getMonth() - 6);
        break;
      case '1y':
        start.setFullYear(end.getFullYear() - 1);
        break;
      default:
        start.setMonth(end.getMonth() - 6);
    }
    return { start, end };
  };

  const { start, end } = getDateRange();
  // const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // Generate data points for the date range
  const generateTimeSeriesData = () => {
    const data = [];
    const currentDate = new Date(start);
    const segmentMultipliers = {
      'Enterprise': 2.5,
      'SMB': 1.5,
      'Startup': 1.0
    } as any;

    while (currentDate <= end) {
      const baseValue = 40000 + Math.random() * 20000;
      const dataPoint = {
        date: new Date(currentDate),
        total: baseValue,
      } as any;

      // Add segment-specific data
      selectedSegments.forEach(segment => {
        dataPoint[segment] = baseValue * segmentMultipliers[segment] * (0.8 + Math.random() * 0.4);
      });

      data.push(dataPoint);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const timeSeriesData = generateTimeSeriesData();

  // Filter feature usage data based on selected features
  const generateFeatureData = () => {
    const allFeatures = {
      'Dashboard': { baseUsage: 75 },
      'Analytics': { baseUsage: 55 },
      'Reports': { baseUsage: 35 },
      'API Access': { baseUsage: 25 },
      'Integrations': { baseUsage: 20 }
    } as any;

    return selectedFeatures.map(feature => ({
      name: feature,
      users: Math.floor(allFeatures[feature].baseUsage + Math.random() * 20),
      previousUsers: comparisonMode ? 
        Math.floor(allFeatures[feature].baseUsage + Math.random() * 20) : 
        undefined
    }));
  };

  return {
    timeSeriesData,
    featureUsage: generateFeatureData(),
    userSegments: selectedSegments.map(segment => ({
      name: segment,
      value: Math.floor(20 + Math.random() * 40)
    })),
    comparisonData: comparisonMode ? generateTimeSeriesData() : undefined
  };
};