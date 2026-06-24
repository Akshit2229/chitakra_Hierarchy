import React from 'react';
import { Play, Loader2 } from 'lucide-react';

export const SubmitButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition-all transform duration-200 active:scale-98 ${
        loading || disabled
          ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed shadow-none'
          : 'bg-primary hover:bg-primary-dark hover:shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5'
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing Graph...</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4 fill-white" />
          <span>Analyze Hierarchy</span>
        </>
      )}
    </button>
  );
};

export default SubmitButton;
