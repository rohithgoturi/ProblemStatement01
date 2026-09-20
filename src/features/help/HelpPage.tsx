import React from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { HelpCircle, BookOpen, ArrowRight, ShieldCheck, Cpu, GitMerge } from 'lucide-react';

export default function HelpPage() {
  const sihSteps = [
    {
      num: '01',
      title: 'Upload / Review Baseline Schedule',
      path: '/schedule',
      desc: 'Verify imported Primavera / MS Project XML schedules with 6.6 km WBS chainage mapping.',
    },
    {
      num: '02',
      title: 'Submit Field DPR Evidence',
      path: '/dpr',
      desc: 'Test unstructured natural language or Hinglish site logs (e.g. Ch. 14+200 trenching & pipe laying).',
    },
    {
      num: '03',
      title: 'AI Multi-Factor Matching',
      path: '/ai-matching',
      desc: 'Inspect chainage proximity, activity semantics, timestamp, and crew matching with 91% confidence.',
    },
    {
      num: '04',
      title: 'Confirm Match & WOW Trigger',
      path: '/ai-matching',
      desc: 'Click "Confirm Match" to advance progress and resolve pending critical path bottlenecks in real-time.',
    },
    {
      num: '05',
      title: 'Monitor S-Curve & Variance',
      path: '/progress',
      desc: 'Examine live S-Curve trajectory, chainage span indicators, and active delay exceptions.',
    },
    {
      num: '06',
      title: 'Export Ministry Compliance Report',
      path: '/reports',
      desc: 'Generate automated audit-ready PDF/Excel progress summaries for NHIDCL / Ministry officials.',
    },
  ];

  const glossary = [
    { term: 'Chainage (Ch.)', def: 'Linear distance notation along an infrastructure corridor (e.g. Ch. 14+200 represents 14 kilometers and 200 meters from zero point).' },
    { term: 'WBS', def: 'Work Breakdown Structure; hierarchical decomposition of the total scope of work into discrete deliverables and activities.' },
    { term: 'S-Curve', def: 'Cumulative progress percentage plotted over project duration, comparing planned baseline versus real actuals.' },
    { term: 'SPI (Schedule Performance Index)', def: 'Ratio of earned work to scheduled work. SPI < 1.0 indicates project delay; SPI > 1.0 indicates ahead of schedule.' },
    { term: 'Hinglish Normalization', def: 'Semantic mapping of bilingual field vernacular (e.g. "Dhalai", "Shuttering", "Mitti khodai") to formal civil engineering work codes.' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader
        title="Help & Evaluation Guide"
        subtitle="System documentation, technical glossary, and SIH jury demo walkthrough."
        breadcrumb={[
          { label: 'Workspace', href: '/workspace' },
          { label: 'Help' },
        ]}
      />

      {/* Evaluation Walkthrough Banner */}
      <Card className="p-6 border border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="text-primary" size={20} />
          <h2 className="text-base font-bold text-neutral-900">SIH 6-Step Evaluation Workflow</h2>
        </div>
        <p className="text-xs text-neutral-600 mb-5">
          Follow this structured sequence to demonstrate end-to-end automated monitoring and AI schedule alignment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sihSteps.map((step) => (
            <Link
              key={step.num}
              to={step.path}
              className="p-4 bg-white rounded-md border border-neutral-200 hover:border-primary/50 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Step {step.num}
                  </span>
                  <ArrowRight size={14} className="text-neutral-400 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xs font-bold text-neutral-900 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Engineering Glossary */}
      <Card className="p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="text-primary" size={18} />
          <h2 className="text-base font-bold text-neutral-900">Domain Glossary & Terminology</h2>
        </div>

        <div className="divide-y divide-neutral-200/80">
          {glossary.map((item, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0">
              <span className="font-mono text-xs font-bold text-neutral-900 block mb-0.5">
                {item.term}
              </span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {item.def}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Notice on Frontend Scope */}
      <div className="p-4 rounded-md bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 flex items-start gap-3">
        <ShieldCheck className="text-neutral-500 shrink-0 mt-0.5" size={18} />
        <div>
          <span className="font-semibold text-neutral-900 block">System Architecture Notice</span>
          PragatiPath Frontend operates as a fully decoupled single-page application built on React 19, TypeScript, and TailwindCSS. All AI matching algorithms, telemetry pipelines, and database records shown are typed simulations ready for seamless REST/GraphQL integration with the backend engine.
        </div>
      </div>
    </div>
  );
}
