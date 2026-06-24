import React from 'react';

export const LoadingSpinner = ({ type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Summary Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          ))}
        </div>

        {/* Tree Visualizer Skeleton */}
        <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>

        {/* Lists Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse text-sm">
        Analyzing graph structure...
      </p>
    </div>
  );
};

export default LoadingSpinner;
