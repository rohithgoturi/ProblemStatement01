import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { StatusChip, activityStatusChip } from '@/components/ui/StatusChip';
import { Drawer } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ChainageMotif } from '@/components/ui/ChainageMotif';
import { useDemoStore } from '@/store/demoStore';
import { MOCK_PROGRESS_DATA_POINTS } from '@/data/mock/progress';
import { formatVariance, formatPercent, formatDateTime, cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { TrendingDown, AlertTriangle, XCircle, Clock } from 'lucide-react';
import type { Activity } from '@/types';

const FILTERS = ['All', 'On Track', 'At Risk', 'Delayed', 'Completed'];

export default function ProgressPage() {
  const { activities, exceptions, selectedProjectId } = useDemoStore();
  const [filter, setFilter] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const summary = {
    planned: 68.4,
    actual: 64.1,
    variance: -4.3,
  };

  const filteredActivities = activities.filter((a) => {
    if (filter === 'All') return true;
    if (filter === 'On Track') return a.status === 'on-track';
    if (filter === 'At Risk') return a.status === 'at-risk';
    if (filter === 'Delayed') return a.status === 'delayed';
    if (filter === 'Completed') return a.status === 'completed';
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Progress Intelligence"
        subtitle="Planned vs actual progress for P-101"
        breadcrumb={[{ label: 'PragatiPath' }, { label: 'Progress' }]}
      />

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Planned', value: formatPercent(summary.planned), color: 'text-primary' },
          { label: 'Actual', value: formatPercent(summary.actual), color: 'text-neutral-900' },
          { label: 'Variance', value: formatVariance(summary.variance), color: 'text-critical-on' },
        ].map(({ label, value, color }) => (
          <Card key={label} padding="md">
            <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wide mb-1">{label}</p>
            <p className={cn('text-2xl font-bold tabular-nums', color)}>{value}</p>
          </Card>
        ))}
      </div>

      {/* S-Curve + Exceptions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
        <div className="lg:col-span-8">
          <Card padding="md">
            <h2 className="text-sm font-semibold text-neutral-800 mb-4">Progress Trend — Planned vs Actual</h2>

            {/* ChainageMotif — the ONE allowed instance on this screen */}
            <ChainageMotif
              startChainage={12000}
              endChainage={13000}
              activeChainage={12400}
              height={40}
              aria-label="Progress chainage context — Ch. 12+000 to Ch. 13+000"
              className="mb-3"
            />

            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_PROGRESS_DATA_POINTS} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1DDE8" strokeWidth={0.5} />
                  <XAxis dataKey="weekLabel" tick={{ fill: '#49647D', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={{ stroke: '#D1DDE8' }} tickLine={false} />
                  <YAxis tick={{ fill: '#49647D', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #D1DDE8', borderRadius: '8px', fontSize: '12px' }} formatter={(v: number, n: string) => [`${v.toFixed(1)}%`, n === 'planned' ? 'Planned' : 'Actual']} />
                  <ReferenceLine y={64.1} stroke="#B42318" strokeDasharray="3 3" strokeWidth={1} />
                  <Line type="monotone" dataKey="planned" stroke="#0056D2" strokeWidth={2} dot={false} name="planned" />
                  <Line type="monotone" dataKey="actual" stroke="#0F6B4F" strokeWidth={2} dot={{ fill: '#0F6B4F', r: 2 }} name="actual" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">[Demo data]</p>
          </Card>
        </div>

        {/* Exceptions */}
        <div className="lg:col-span-4">
          <Card padding="none" className="h-full">
            <div className="px-4 py-3 border-b border-neutral-100">
              <h2 className="text-sm font-semibold text-neutral-800">Exceptions</h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {exceptions.filter(e => !e.resolved).map((e) => {
                const Icon = e.severity === 'critical' ? XCircle : e.type === 'unverified-update' ? Clock : AlertTriangle;
                return (
                  <div key={e.id} className={cn(
                    'px-4 py-3',
                    e.severity === 'critical' ? 'bg-critical-surface/50' : 'bg-warning-surface/50'
                  )}>
                    <div className="flex items-start gap-2">
                      <Icon size={14} strokeWidth={1.5} className={e.severity === 'critical' ? 'text-critical mt-0.5 shrink-0' : 'text-warning mt-0.5 shrink-0'} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-800">{e.activityName ?? 'Project'}</p>
                        <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">{e.description}</p>
                        <div className="mt-1.5">
                          <StatusChip variant={e.severity === 'critical' ? 'critical' : 'warning'} label={e.severity === 'critical' ? 'Critical' : 'At Risk'} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {exceptions.filter(e => e.resolved).length > 0 && (
                <div className="px-4 py-2.5 bg-success-surface/30">
                  <p className="text-[11px] text-success-on font-medium">✓ {exceptions.filter(e => e.resolved).length} exception(s) resolved</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Filter + Activity Table */}
      <Card padding="none">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center gap-3 flex-wrap">
          <h2 className="text-sm font-semibold text-neutral-800 mr-auto">Activities</h2>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-fast',
                filter === f ? 'bg-primary text-white' : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['ID', 'Activity', 'WBS', 'Location', 'Planned', 'Actual', 'Variance', 'Status', ''].map(h => (
                  <th key={h} className={cn('px-4 py-2.5 text-left text-xs font-semibold text-neutral-600 whitespace-nowrap', ['Planned', 'Actual', 'Variance'].includes(h) && 'text-right')}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((a) => {
                const { variant, label } = activityStatusChip(a.status);
                return (
                  <tr key={a.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors cursor-pointer" onClick={() => setSelectedActivity(a)}>
                    <td className="px-4 py-2.5"><span className="font-mono text-xs font-semibold text-primary">{a.id}</span></td>
                    <td className="px-4 py-2.5"><p className="text-xs font-medium text-neutral-800 max-w-[160px] truncate">{a.name}</p></td>
                    <td className="px-4 py-2.5"><span className="font-mono text-[11px] text-neutral-500">{a.wbs}</span></td>
                    <td className="px-4 py-2.5"><span className="text-[11px] text-neutral-600 max-w-[120px] truncate block">{a.location}</span></td>
                    <td className="px-4 py-2.5 text-right"><span className="font-mono text-xs tabular-nums text-neutral-700">{a.plannedProgress}%</span></td>
                    <td className="px-4 py-2.5 text-right"><span className="font-mono text-xs tabular-nums font-semibold text-neutral-900">{a.actualProgress}%</span></td>
                    <td className="px-4 py-2.5 text-right"><span className={cn('font-mono text-xs tabular-nums font-semibold', a.variance < 0 ? 'text-critical-on' : 'text-success-on')}>{formatVariance(a.variance)}</span></td>
                    <td className="px-4 py-2.5"><StatusChip variant={variant} label={label} /></td>
                    <td className="px-4 py-2.5"><button className="text-xs font-semibold text-primary hover:underline">Detail</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activity Detail Drawer */}
      <Drawer isOpen={!!selectedActivity} onClose={() => setSelectedActivity(null)} title={selectedActivity?.id ?? 'Activity Detail'}>
        {selectedActivity && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wide mb-1">Activity</p>
              <p className="text-sm font-semibold text-neutral-900">{selectedActivity.name}</p>
            </div>
            {[
              { label: 'Activity ID', value: selectedActivity.id, mono: true },
              { label: 'WBS', value: selectedActivity.wbs, mono: true },
              { label: 'Location', value: selectedActivity.location, mono: true },
              { label: 'Category', value: selectedActivity.category, mono: false },
              { label: 'Planned Start', value: selectedActivity.plannedStart, mono: false },
              { label: 'Planned Finish', value: selectedActivity.plannedFinish, mono: false },
              { label: 'Planned %', value: `${selectedActivity.plannedProgress}%`, mono: true },
              { label: 'Actual %', value: `${selectedActivity.actualProgress}%`, mono: true },
              { label: 'Variance', value: formatVariance(selectedActivity.variance), mono: true },
              { label: 'Reviewer', value: selectedActivity.reviewer ?? '—', mono: false },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex items-start gap-3 py-2 border-b border-neutral-100">
                <span className="text-xs font-semibold text-neutral-600 w-28 shrink-0">{label}</span>
                <span className={cn('text-xs text-neutral-900 flex-1', mono && 'font-mono')}>{value}</span>
              </div>
            ))}
            {selectedActivity.matchStatus && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-neutral-600">AI Match</span>
                <StatusChip
                  variant={selectedActivity.matchStatus === 'verified' ? 'success' : selectedActivity.matchStatus === 'recommended' ? 'ai' : 'warning'}
                  label={selectedActivity.matchStatus}
                />
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
