import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, FileText, Cpu,
  TrendingUp, BarChart3, ArrowRight, FolderOpen
} from 'lucide-react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { useDemoStore } from '@/store/demoStore';
import { ROLE_LABELS } from '@/types';
import { cn } from '@/lib/utils';

// ============================================================
// PRAGATIPATH — Workspace Entry Page
// Route: /workspace
// Welcome screen + shortcuts + demo path prompt
// ============================================================

const SHORTCUTS = [
  { path: '/dashboard', label: 'Dashboard', desc: 'Planned vs actual, KPIs, variance', Icon: LayoutDashboard, color: 'text-primary' },
  { path: '/projects', label: 'Projects', desc: 'Project list and context', Icon: FolderOpen, color: 'text-neutral-700' },
  { path: '/schedule', label: 'Schedule', desc: 'Upload and review schedule registry', Icon: Calendar, color: 'text-neutral-700' },
  { path: '/dpr', label: 'DPR', desc: 'Submit daily field progress', Icon: FileText, color: 'text-neutral-700' },
  { path: '/ai-matching', label: 'AI Matching', desc: 'Review and validate AI recommendations', Icon: Cpu, color: 'text-ai-on' },
  { path: '/progress', label: 'Progress', desc: 'Planned vs actual intelligence', Icon: TrendingUp, color: 'text-neutral-700' },
  { path: '/reports', label: 'Reports', desc: 'Generate and download project reports', Icon: BarChart3, color: 'text-neutral-700' },
];

const DEMO_PATH = [
  { step: '1', label: 'Dashboard', path: '/dashboard', desc: 'See overall project health' },
  { step: '2', label: 'Schedule', path: '/schedule', desc: 'Review activity context' },
  { step: '3', label: 'DPR', path: '/dpr', desc: 'Submit field observation' },
  { step: '4', label: 'AI Matching', path: '/ai-matching', desc: 'Confirm match — updates progress' },
  { step: '5', label: 'Progress', path: '/progress', desc: 'See updated actuals' },
  { step: '6', label: 'Reports', path: '/reports', desc: 'View reflected state' },
];

export default function WorkspacePage() {
  const { currentUser, selectedProjectId, projects } = useDemoStore();
  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? projects[0];

  const roleLabel = currentUser ? ROLE_LABELS[currentUser.role] : 'Guest';

  return (
    <div className="max-w-5xl">
      <PageHeader
        title={`Welcome back, ${currentUser?.name?.split(' ')[0] ?? 'User'}.`}
        subtitle={`Signed in as ${roleLabel} · ${selectedProject.name}`}
      />

      {/* Demo mode notice */}
      <div className="bg-warning-surface border border-warning-border rounded px-4 py-3 flex items-start gap-2.5 mb-6">
        <span className="text-warning-on font-mono text-[11px] font-bold uppercase shrink-0 mt-0.5">DEMO</span>
        <div>
          <p className="text-sm text-warning-on font-medium">Demo Mode — sample data only</p>
          <p className="text-xs text-warning-on/80 mt-0.5">
            All project data, AI matches, and reports shown are for demonstration purposes only. No real project data is displayed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Shortcuts */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SHORTCUTS.map(({ path, label, desc, Icon, color }) => (
              <Link
                key={path}
                to={path}
                className="group block bg-white border border-neutral-200 rounded-md p-4 hover:border-neutral-300 hover:shadow-card transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className={cn('mb-2.5 transition-colors', color, 'group-hover:scale-105')}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-neutral-900">{label}</p>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Demo SIH path */}
        <div>
          <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">Demo Path</h2>
          <Card padding="none" className="overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
              <p className="text-xs font-semibold text-neutral-700">SIH Demo Sequence</p>
              <p className="text-xs text-neutral-500 mt-0.5">Follow this path to see the complete workflow</p>
            </div>
            <div className="divide-y divide-neutral-100">
              {DEMO_PATH.map(({ step, label, path, desc }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group"
                >
                  <span className="font-mono text-[10px] font-bold text-neutral-400 mt-0.5 w-4 shrink-0">{step}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-900">{label}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{desc}</p>
                  </div>
                  <ArrowRight size={12} strokeWidth={1.5} className="text-neutral-300 group-hover:text-neutral-500 mt-0.5 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
            <div className="px-4 py-3 bg-success-surface/50 border-t border-success-border/40">
              <p className="text-[11px] text-success-on font-medium">
                Key moment: Confirm match in AI Matching → progress updates automatically
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
