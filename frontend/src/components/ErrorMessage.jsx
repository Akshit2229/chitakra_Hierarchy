import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-700 dark:text-red-300 animate-slide-up">
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <div className="text-sm font-medium">
        <span className="font-bold">Error:</span> {message || "API call failed. Please check if backend is running."}
      </div>
    </div>
  );
};

export default ErrorMessage;
