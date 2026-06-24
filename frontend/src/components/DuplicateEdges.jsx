import React from 'react';
import { CopyMinus } from 'lucide-react';

export const DuplicateEdges = ({ edges }) => {
  if (!edges || edges.length === 0) {
    return (
      <div className="p-5 bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-center">
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 block">Duplicate Edges</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">No duplicate edges found.</span>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg">
          <CopyMinus className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
          Duplicate Edges ({edges.length})
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
        {edges.map((edge, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 text-xs font-semibold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-950/50 rounded-lg select-all"
          >
            {edge}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DuplicateEdges;
