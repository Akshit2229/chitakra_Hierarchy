import React, { useState } from 'react';
import { GitCommit, GitFork, RefreshCw, Layers, Code, ChevronRight, ChevronDown, Check, Copy } from 'lucide-react';

// Recursive Tree Node Component
const TreeNode = ({ name, subtree }) => {
  const childrenKeys = Object.keys(subtree || {});
  const isLeaf = childrenKeys.length === 0;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="pl-6 border-l border-dashed border-slate-200 dark:border-slate-800 ml-4 relative mt-2 animate-fade-in">
      {/* Horizontal connector line indicator */}
      <div className="absolute w-4 h-px border-t border-dashed border-slate-200 dark:border-slate-800 -left-6 top-[15px]"></div>
      
      {/* Node bullet */}
      <div className={`absolute w-1.5 h-1.5 rounded-full -left-[3px] top-[13px] ${
        isLeaf ? 'bg-slate-300 dark:bg-slate-600' : 'bg-primary'
      }`}></div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => !isLeaf && setIsOpen(!isOpen)}
          disabled={isLeaf}
          className={`px-3 py-1 flex items-center space-x-1.5 rounded-lg border font-bold text-sm shadow-sm transition-all select-none ${
            isLeaf
              ? 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-primary dark:text-primary-light hover:border-primary cursor-pointer active:scale-95'
          }`}
        >
          {!isLeaf && (
            <span>
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
          )}
          <span>{name}</span>
        </button>

        {!isLeaf && (
          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-semibold">
            {childrenKeys.length} {childrenKeys.length === 1 ? 'child' : 'children'}
          </span>
        )}
      </div>

      {isOpen && !isLeaf && (
        <div className="mt-1 space-y-1">
          {childrenKeys.map((childKey) => (
            <TreeNode key={childKey} name={childKey} subtree={subtree[childKey]} />
          ))}
        </div>
      )}
    </div>
  );
};

// Cycle Path Flow Builder
const CycleFlow = ({ root, tree, activeEdges }) => {
  // Trace the cycle using activeEdges
  const traceCycle = () => {
    // Collect mapping of edges
    const map = {};
    for (const edge of activeEdges || []) {
      const [u, v] = edge.split('->');
      map[u] = v;
    }

    const path = [root];
    const visited = new Set([root]);
    let curr = root;

    // Follow the unique outgoing link
    while (map[curr]) {
      const next = map[curr];
      if (visited.has(next)) {
        path.push(next); // Close the loop
        break;
      }
      path.push(next);
      visited.add(next);
      curr = next;
    }
    return path;
  };

  const path = traceCycle();

  return (
    <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-3">
      <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center space-x-1">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>Loop Path Visualization</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 py-2">
        {path.map((node, index) => (
          <React.Fragment key={index}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg border font-bold text-sm shadow-sm ${
              index === 0 || index === path.length - 1
                ? 'bg-amber-500 border-amber-600 text-white font-extrabold'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}>
              {node}
            </div>
            {index < path.length - 1 && (
              <span className="text-slate-400 dark:text-slate-600 font-bold">➔</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Main Tree View Panel
export const TreeView = ({ hierarchies, activeEdges }) => {
  const [activeTab, setActiveTab] = useState({}); // hierarchyIndex -> 'visual' | 'json'
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!hierarchies || hierarchies.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-2">
        <div className="flex justify-center text-slate-300 dark:text-slate-700">
          <GitFork className="w-12 h-12" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Graph Data</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Input edges above and hit submit to view hierarchies.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Layers className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Detected Hierarchies ({hierarchies.length})
        </h2>
      </div>

      <div className="space-y-6">
        {hierarchies.map((h, idx) => {
          const tab = activeTab[idx] || 'visual';
          const setTab = (newTab) => setActiveTab({ ...activeTab, [idx]: newTab });
          const jsonString = JSON.stringify(h, null, 2);

          return (
            <div
              key={idx}
              className="bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800 gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-lg ${
                    h.has_cycle
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : 'bg-primary/10 text-primary dark:text-primary-light'
                  }`}>
                    {h.has_cycle ? <RefreshCw className="w-4 h-4 animate-spin-slow" /> : <GitCommit className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                      Hierarchy Root: <span className="text-primary dark:text-primary-light font-black">{h.root}</span>
                    </h3>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        h.has_cycle
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {h.has_cycle ? 'Cycle Component' : 'Tree Component'}
                      </span>
                      {!h.has_cycle && (
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          Depth: <span className="font-extrabold">{h.depth}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tab Controls & Copy */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                    <button
                      onClick={() => setTab('visual')}
                      className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        tab === 'visual'
                          ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <GitFork className="w-3.5 h-3.5" />
                      <span>Visual</span>
                    </button>
                    <button
                      onClick={() => setTab('json')}
                      className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        tab === 'json'
                          ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>JSON</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopy(jsonString, idx)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200/50 dark:border-slate-700/50 transition-all"
                    title="Copy response JSON"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {tab === 'visual' ? (
                  <div className="space-y-4">
                    {h.has_cycle ? (
                      <CycleFlow root={h.root} tree={h.tree} activeEdges={activeEdges} />
                    ) : (
                      <div className="overflow-x-auto pb-2">
                        {/* Recursive tree root render */}
                        {Object.keys(h.tree).map((rootKey) => (
                          <div key={rootKey} className="relative pl-2">
                            <div className="flex items-center space-x-2">
                              <span className="w-7 h-7 flex items-center justify-center bg-primary text-white font-extrabold rounded-lg text-sm shadow-md">
                                {rootKey}
                              </span>
                              <span className="text-[10px] bg-primary/10 text-primary dark:text-primary-light px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                Root
                              </span>
                            </div>
                            {Object.keys(h.tree[rootKey]).map((childKey) => (
                              <TreeNode
                                key={childKey}
                                name={childKey}
                                subtree={h.tree[rootKey][childKey]}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="p-4 bg-slate-900 dark:bg-slate-950 text-slate-100 dark:text-slate-300 font-mono text-xs overflow-x-auto rounded-xl border border-slate-800 leading-relaxed max-h-80 select-all">
                      <code>{jsonString}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreeView;
