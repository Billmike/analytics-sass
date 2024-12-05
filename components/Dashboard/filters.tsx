// components/dashboard/Filters.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

export interface FilterProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  selectedSegments: string[];
  setSelectedSegments: (segments: string[]) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
  comparisonMode: boolean;
  setComparisonMode: (enabled: boolean) => void;
}

const Filters = ({
  timeRange,
  setTimeRange,
  dateRange,
  setDateRange,
  selectedSegments,
  setSelectedSegments,
  selectedFeatures,
  setSelectedFeatures,
  comparisonMode,
  setComparisonMode
}: FilterProps) => {
  const segments = ['Enterprise', 'SMB', 'Startup'];
  const features = ['Dashboard', 'Analytics', 'Reports', 'API Access', 'Integrations'];

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Preset Time Range */}
          <select 
            className="border rounded-md p-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>

          {/* Custom Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarDays className="mr-2 h-4 w-4" />
                {dateRange[0] && dateRange[1] ? (
                  `${format(dateRange[0], 'PP')} - ${format(dateRange[1], 'PP')}`
                ) : (
                  "Pick a date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={{ 
                  from: dateRange[0] || undefined, 
                  to: dateRange[1] || undefined 
                }}
                onSelect={(range) => {
                  setDateRange([range?.from || null, range?.to || null]);
                  if (range?.from && range?.to) {
                    setTimeRange('custom');
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Comparison Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="comparison"
              checked={comparisonMode}
              onCheckedChange={(checked) => setComparisonMode(checked as boolean)}
            />
            <label htmlFor="comparison">Enable comparison mode</label>
          </div>
        </div>

        {/* Segments Filter */}
        <div className="space-y-2">
          <h3 className="font-medium">User Segments</h3>
          <div className="flex gap-4">
            {segments.map((segment) => (
              <div key={segment} className="flex items-center space-x-2">
                <Checkbox 
                  id={segment}
                  checked={selectedSegments.includes(segment)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSegments([...selectedSegments, segment]);
                    } else {
                      setSelectedSegments(selectedSegments.filter(s => s !== segment));
                    }
                  }}
                />
                <label htmlFor={segment}>{segment}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Features Filter */}
        <div className="space-y-2">
          <h3 className="font-medium">Features</h3>
          <div className="flex flex-wrap gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox 
                  id={feature}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFeatures([...selectedFeatures, feature]);
                    } else {
                      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                    }
                  }}
                />
                <label htmlFor={feature}>{feature}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Filters;