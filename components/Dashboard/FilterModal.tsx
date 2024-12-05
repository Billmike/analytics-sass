/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter } from 'lucide-react';
import Filters from './filters';

export const FilterModal = ({ 
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
}: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Dashboard Filters</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Filters
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedSegments={selectedSegments}
            setSelectedSegments={setSelectedSegments}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
            comparisonMode={comparisonMode}
            setComparisonMode={setComparisonMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
