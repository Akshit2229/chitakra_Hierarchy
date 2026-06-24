import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const InvalidEntries = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="p-5 bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-center">
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 block">Invalid Entries</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">No invalid entries detected.</span>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-rose-500/10 text-rose-600 rounded-lg">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
          Invalid Entries ({entries.length})
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
        {entries.map((entry, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 text-xs font-semibold bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-950/50 rounded-lg select-all"
          >
            {entry === "" ? '"" (Empty)' : entry}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InvalidEntries;
