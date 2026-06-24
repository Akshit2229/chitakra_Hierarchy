import React from 'react';
import { Trees, RefreshCw, Trophy } from 'lucide-react';

export const SummaryCard = ({ summary }) => {
  const { total_trees = 0, total_cycles = 0, largest_tree_root = null } = summary || {};

  const cards = [
    {
      title: 'Total Trees',
      value: total_trees,
      description: 'Forest components with zero cycles',
      icon: Trees,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Total Cycles',
      value: total_cycles,
      description: 'Circular feedback loops detected',
      icon: RefreshCw,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      title: 'Largest Tree Root',
      value: largest_tree_root || 'N/A',
      description: 'Tree with the most node members',
      icon: Trophy,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex items-center justify-between p-5 bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover-lift transition-all"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {card.value}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {card.description}
              </span>
            </div>
            <div className={`p-3.5 rounded-xl border ${card.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCard;
