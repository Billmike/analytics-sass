import React from 'react';

interface HeatMapProps {
  data: Array<{
    cohort: Date;
    size: number;
    retentionData: Array<{
      month: number;
      rate: number;
    }>;
  }>;
  theme: string;
}

export const HeatMap = ({ data, theme }: HeatMapProps) => {
  const getColor = (value: number) => {
    // Color scale from red (0%) to green (100%)
    const hue = ((value) * 120).toString(10);
    return theme === 'dark' 
      ? `hsla(${hue}, 70%, 35%, ${0.2 + (value/100) * 0.8})`
      : `hsla(${hue}, 70%, 45%, ${0.2 + (value/100) * 0.8})`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Cohort</th>
            {Array.from({ length: 6 }, (_, i) => (
              <th key={i} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                M{i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((cohort) => (
            <tr key={cohort.cohort.toISOString()}>
              <td className="px-4 py-2 text-sm font-medium dark:text-white">
                {cohort.cohort.toLocaleDateString('default', { month: 'short', year: 'numeric' })}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {cohort.size.toLocaleString()} users
                </div>
              </td>
              {cohort.retentionData.map((data, index) => (
                <td 
                  key={index}
                  className="px-4 py-2"
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center rounded"
                    style={{ backgroundColor: getColor(data.rate / 100) }}
                  >
                    <span className="text-sm font-medium dark:text-white">
                      {data.rate.toFixed(1)}%
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};