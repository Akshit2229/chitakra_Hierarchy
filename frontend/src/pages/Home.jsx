import React, { useState, useEffect } from 'react';
import { processGraph } from '../services/api';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import SummaryCard from '../components/SummaryCard';
import TreeView from '../components/TreeView';
import InvalidEntries from '../components/InvalidEntries';
import DuplicateEdges from '../components/DuplicateEdges';
import MultipleParents from '../components/MultipleParents';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Sun, Moon, Info, CheckCircle, Github, ClipboardCheck, Sparkles } from 'lucide-react';

export const Home = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(pre-prefer-color-scheme: dark)').matches);
  });

  // Inputs and result states
  const [inputValue, setInputValue] = useState('A->B\nA->C\nB->D');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Trigger Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Sync dark mode class on HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Split by newline and filter empty lines
      const edges = inputValue
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const res = await processGraph(edges);
      setResponse(res);
      
      // Dynamic success toast feedback
      if (res.summary.total_cycles > 0) {
        showToast(`Analyzed! Found ${res.summary.total_cycles} cycle(s).`, 'warning');
      } else {
        showToast('Graph analyzed successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'API call failed. Please make sure the backend server is running.');
      showToast('Graph analysis failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Automatically submit on initial load to show nice default results
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleCopyFullResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    showToast('Copied full JSON response to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-bgLight dark:bg-bgDark">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold animate-slide-up ${
          toast.type === 'error'
            ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/50'
            : toast.type === 'warning'
            ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50'
            : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50'
        }`}>
          <CheckCircle className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-cardDark/80 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl accent-gradient flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-md sm:text-lg font-black tracking-tight text-slate-850 dark:text-white leading-none">
                Chitkara Hierarchy
              </h1>
              <span className="text-[10px] text-primary dark:text-primary-light font-extrabold uppercase tracking-widest">
                Full Stack Challenge
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Session Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Input Card */}
            <div className="p-5 bg-white dark:bg-cardDark border border-slate-150 dark:border-slate-800 rounded-2xl shadow-sm space-y-5">
              <InputBox
                value={inputValue}
                onChange={setInputValue}
                disabled={loading}
              />
              <SubmitButton
                onClick={handleSubmit}
                loading={loading}
                disabled={!inputValue.trim()}
              />
              
              {response && (
                <button
                  onClick={handleCopyFullResponse}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold active:scale-98 transition-all"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Copy Full API Response</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Visual Dashboard Results */}
          <div className="lg:col-span-8 space-y-8">
            {error && <ErrorMessage message={error} />}

            {loading ? (
              <LoadingSpinner type="skeleton" />
            ) : response ? (
              <div className="space-y-8 animate-slide-up">
                
                {/* 1. Summary Grid */}
                <SummaryCard summary={response.summary} />

                {/* 2. Visual Trees & Cycles Section */}
                <TreeView
                  hierarchies={response.hierarchies}
                  activeEdges={response.active_edges}
                />

                {/* 3. Filtering and Invalid Status Panels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InvalidEntries entries={response.invalid_entries} />
                  <DuplicateEdges edges={response.duplicate_edges} />
                  <MultipleParents edges={response.ignored_multiple_parent_edges} />
                </div>

              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl space-y-4">
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Enter some edges in the input panel and click Analyze to view output dashboard.
                </p>
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-850 bg-white dark:bg-cardDark transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 Chitkara Full Stack Engineering Challenge. All rights reserved.</p>
          <div className="flex items-center space-x-1.5">
            <Github className="w-3.5 h-3.5" />
            <span>Developer Portfolio Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
