import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip } from '@/components/ui/StatusChip';
import { LoadingState } from '@/components/ui/Card';
import { MOCK_REPORT_TEMPLATES, MOCK_RECENT_REPORTS } from '@/data/mock/reports';
import { simulateReportGeneration } from '@/services';
import { formatDateTime, cn } from '@/lib/utils';
import { BarChart3, Download, FileText, ClipboardList, TrendingUp, Zap, Database } from 'lucide-react';
import type { ReportRecord } from '@/types';

const TEMPLATE_ICONS: Record<string, React.ElementType> = {
  'RPT-TPL-001': FileText,
  'RPT-TPL-002': TrendingUp,
  'RPT-TPL-003': ClipboardList,
  'RPT-TPL-004': Zap,
  'RPT-TPL-005': Database,
};

const STATUS_MAP: Record<string, { variant: 'success' | 'warning' | 'neutral'; label: string }> = {
  'ready':      { variant: 'success', label: 'Ready' },
  'generating': { variant: 'warning', label: 'Generating' },
  'failed':     { variant: 'neutral', label: 'Failed' },
};

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<ReportRecord[]>([]);

  const handleGenerate = async (templateId: string) => {
    setGenerating(templateId);
    try {
      const report = await simulateReportGeneration(templateId, 'P-101');
      setGenerated((prev) => [report, ...prev]);
    } finally {
      setGenerating(null);
    }
  };

  const allRecent = [...generated, ...MOCK_RECENT_REPORTS];

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate and download project progress reports"
        breadcrumb={[{ label: 'PragatiPath' }, { label: 'Reports' }]}
      />

      {/* Template grid — asymmetric, NOT identical cards */}
      <h2 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">Report Templates</h2>

      {/* Featured template — large */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        {MOCK_REPORT_TEMPLATES.slice(0, 1).map((t) => {
          const Icon = TEMPLATE_ICONS[t.id] ?? FileText;
          const isGenerating = generating === t.id;
          return (
            <div key={t.id} className="md:col-span-5">
              <Card padding="md" className="h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{t.category} · {t.estimatedPages} page{t.estimatedPages > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3 flex-1">{t.description}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    loading={isGenerating}
                    onClick={() => handleGenerate(t.id)}
                    leftIcon={!isGenerating && <BarChart3 size={12} strokeWidth={1.5} />}
                  >
                    {isGenerating ? 'Generating…' : 'Generate'}
                  </Button>
                  <div className="flex gap-1">
                    {t.formats.map((f) => (
                      <span key={f} className="text-[10px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded-sm uppercase">{f}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}

        {/* Compact templates */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_REPORT_TEMPLATES.slice(1).map((t) => {
            const Icon = TEMPLATE_ICONS[t.id] ?? FileText;
            const isGenerating = generating === t.id;
            return (
              <Card key={t.id} padding="md" className="flex items-start gap-3">
                <div className="h-8 w-8 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={1.5} className="text-neutral-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-900 leading-snug">{t.name}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{t.category} · {t.estimatedPages}p</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      loading={isGenerating}
                      onClick={() => handleGenerate(t.id)}
                      className="text-[11px] h-7 px-2"
                    >
                      {isGenerating ? '…' : 'Generate'}
                    </Button>
                    {t.formats.map((f) => (
                      <span key={f} className="text-[10px] font-mono text-neutral-400 uppercase">{f}</span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent reports table */}
      <h2 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">Recent Reports</h2>
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Report ID', 'Name', 'Period', 'Generated', 'Format', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allRecent.map((r) => {
                const { variant, label } = STATUS_MAP[r.status] ?? { variant: 'neutral' as const, label: r.status };
                return (
                  <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-2.5"><span className="font-mono text-[11px] text-neutral-600">{r.id}</span></td>
                    <td className="px-4 py-2.5"><p className="text-xs font-medium text-neutral-800 max-w-[200px] truncate">{r.templateName}</p></td>
                    <td className="px-4 py-2.5"><span className="text-xs text-neutral-600">{r.period}</span></td>
                    <td className="px-4 py-2.5"><span className="text-xs font-mono text-neutral-500">{formatDateTime(r.generatedAt)}</span></td>
                    <td className="px-4 py-2.5"><span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded-sm uppercase">{r.format}</span></td>
                    <td className="px-4 py-2.5"><StatusChip variant={variant} label={label} /></td>
                    <td className="px-4 py-2.5">
                      <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                        <Download size={12} strokeWidth={1.5} /> Export
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-warning-surface/30 border-t border-warning-border/30">
          <p className="text-[11px] text-warning-on">
            [Demo data] — Reports shown are simulated. Export downloads sample data only.
          </p>
        </div>
      </Card>
    </div>
  );
}
