import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { StatusChip } from '@/components/ui/StatusChip';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/Input';
import { useDemoStore } from '@/store/demoStore';
import { MOCK_SCHEDULE } from '@/data/mock/schedule';
import { formatDate, cn } from '@/lib/utils';
import { Upload, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Mechanical', 'Civil Prep', 'Piping Alignment', 'Electrical Tie-in'];

const STATUS_MAP: Record<string, { variant: 'success' | 'warning' | 'neutral'; label: string }> = {
  'active':         { variant: 'success', label: 'Active' },
  'pending-review': { variant: 'warning', label: 'Pending Review' },
  'draft':          { variant: 'neutral', label: 'Draft' },
  'archived':       { variant: 'neutral', label: 'Archived' },
};

export default function SchedulePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const entries = MOCK_SCHEDULE.filter((s) =>
    (activeCategory === 'All' || s.category === activeCategory) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Schedule Registry"
        subtitle="Uploaded baseline and lookahead schedules for P-101"
        breadcrumb={[{ label: 'PragatiPath' }, { label: 'Schedule' }]}
        actions={
          <Button variant="primary" size="sm" leftIcon={<Upload size={14} strokeWidth={1.5} />}>
            Import Schedule
          </Button>
        }
      />
      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <SearchInput
          placeholder="Search schedules…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56"
        />
        <div className="flex items-center gap-1.5 flex-wrap" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-fast',
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Schedule Name', 'Type', 'Version', 'Uploaded', 'Activities', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((s) => {
                const { variant, label } = STATUS_MAP[s.status] ?? { variant: 'neutral' as const, label: s.status };
                return (
                  <tr key={s.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-neutral-900">{s.name}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{s.source}</p>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs text-neutral-700 capitalize">{s.type}</span></td>
                    <td className="px-4 py-3"><span className="font-mono text-xs text-neutral-700">{s.version}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-neutral-600">{formatDate(s.uploadedAt)}</span></td>
                    <td className="px-4 py-3"><span className="font-mono text-xs tabular-nums text-neutral-800">{s.activities}</span></td>
                    <td className="px-4 py-3"><StatusChip variant={variant} label={label} /></td>
                    <td className="px-4 py-3">
                      <button className="text-xs font-semibold text-primary hover:underline">View Gantt</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
