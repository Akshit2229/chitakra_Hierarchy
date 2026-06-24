import React from 'react';
import { Network, FileText, Sparkles } from 'lucide-react';

const PRESETS = [
  {
    name: 'Simple Tree',
    desc: 'Root A with child paths',
    data: 'A->B\nA->C\nB->D'
  },
  {
    name: 'Disjoint Forest',
    desc: 'Multiple separate trees',
    data: 'A->B\nA->C\nX->Y\nY->Z'
  },
  {
    name: 'Pure Cycle',
    desc: 'No root cyclic path',
    data: 'X->Y\nY->Z\nZ->X'
  },
  {
    name: 'Multiple Parents',
    desc: 'Tests parent filtering',
    data: 'A->D\nB->D\nC->D'
  },
  {
    name: 'Mixed & Invalid',
    desc: 'Contains errors & duplicates',
    data: 'A->B\nhello\nA->A\nA->B\nB->C\nC->D'
  }
];

export const InputBox = ({ value, onChange, disabled }) => {
  const lineCount = value.split('\n').filter(l => l.trim().length > 0).length;

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Network className="w-4 h-4 text-primary" />
          <span>Graph Edges Input</span>
        </label>
        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
          {lineCount} edge{lineCount !== 1 ? 's' : ''} detected
        </span>
      </div>

      {/* Preset Badges */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            disabled={disabled}
            onClick={() => onChange(preset.data)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-cardDark border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary-light text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light rounded-lg transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-50"
            title={preset.desc}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Input Textarea Container */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter edges here (one per line, e.g. A->B)..."
          rows={6}
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/10 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl shadow-inner focus:outline-none transition-all resize-y font-mono text-sm leading-relaxed"
        />
        <div className="absolute right-3 bottom-3 text-slate-400 dark:text-slate-600 pointer-events-none">
          <FileText className="w-4 h-4" />
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
        Supported format: <code className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1 py-0.5 rounded font-mono">X-&gt;Y</code> where X and Y are single uppercase letters. One edge per line.
      </p>
    </div>
  );
};

export default InputBox;
