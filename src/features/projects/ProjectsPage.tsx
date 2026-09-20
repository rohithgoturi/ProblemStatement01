import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip } from '@/components/ui/StatusChip';
import { useDemoStore } from '@/store/demoStore';
import { MOCK_PROJECTS } from '@/data/mock/projects';
import { MapPin, Calendar, CheckCircle2, ArrowRight, Plus, ExternalLink, Briefcase } from 'lucide-react';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const { selectedProjectId, setSelectedProject } = useDemoStore();
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Directory"
        subtitle="Manage and view enterprise linear infrastructure projects under PragatiPath monitoring."
        breadcrumb={[
          { label: 'Workspace', href: '/workspace' },
          { label: 'Projects' },
        ]}
        actions={
          <Button variant="primary" size="sm" onClick={() => alert('Demo Mode: Adding new projects is simulated.')}>
            <Plus size={14} className="mr-1.5" />
            Add Project
          </Button>
        }
      />

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {MOCK_PROJECTS.map((proj) => {
          const isActive = proj.id === selectedProjectId;
          return (
            <Card
              key={proj.id}
              className={`p-5 transition-all duration-normal border ${
                isActive ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {proj.id}
                    </span>
                    <StatusChip variant="success" label="Active Monitoring" />
                    {isActive && (
                      <span className="text-[11px] font-semibold text-primary flex items-center gap-1 bg-white border border-primary/30 px-1.5 py-0.5 rounded">
                        <CheckCircle2 size={12} /> Current Selection
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{proj.name}</h3>
                  <p className="text-xs text-neutral-600 mt-0.5 flex items-center gap-1">
                    <Briefcase size={12} className="text-neutral-400" />
                    {proj.client}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-700 mb-4 line-clamp-2">
                {proj.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-t border-b border-neutral-200/80 mb-4 bg-white/60 rounded px-2">
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-semibold">Chainage Span</p>
                  <p className="text-xs font-mono font-medium text-neutral-800 mt-0.5 truncate flex items-center gap-1">
                    <MapPin size={11} className="text-neutral-400 shrink-0" />
                    {proj.location.split('—')[1]?.trim() ?? proj.location}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-semibold">Contract Value</p>
                  <p className="text-xs font-semibold text-neutral-900 mt-0.5">{proj.contractValue}</p>
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase font-semibold">Target Completion</p>
                  <p className="text-xs font-medium text-neutral-800 mt-0.5 flex items-center gap-1">
                    <Calendar size={11} className="text-neutral-400 shrink-0" />
                    {proj.targetEndDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProjectForDetail(proj)}
                >
                  View Details
                </Button>

                {!isActive ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedProject(proj.id)}
                  >
                    Select Project
                    <ArrowRight size={13} className="ml-1.5" />
                  </Button>
                ) : (
                  <span className="text-xs font-medium text-primary flex items-center gap-1">
                    Active in Workspace
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Project detail modal */}
      {selectedProjectForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40">
          <div className="bg-white rounded-lg border border-neutral-200 max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {selectedProjectForDetail.id}
                </span>
                <h2 className="text-lg font-bold text-neutral-900 mt-2">{selectedProjectForDetail.name}</h2>
                <p className="text-xs text-neutral-600">{selectedProjectForDetail.client}</p>
              </div>
              <button
                onClick={() => setSelectedProjectForDetail(null)}
                className="text-neutral-400 hover:text-neutral-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 mb-6">
              <div>
                <span className="font-semibold block text-neutral-900">Project Scope</span>
                <p className="mt-1 leading-relaxed">{selectedProjectForDetail.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="font-semibold block text-neutral-900">Contract Value</span>
                  <p className="font-mono text-sm text-neutral-800 font-bold mt-0.5">{selectedProjectForDetail.contractValue}</p>
                </div>
                <div>
                  <span className="font-semibold block text-neutral-900">Chainage Coverage</span>
                  <p className="font-mono text-xs text-neutral-800 mt-0.5">{selectedProjectForDetail.location}</p>
                </div>
                <div>
                  <span className="font-semibold block text-neutral-900">Start Date</span>
                  <p className="text-neutral-800 mt-0.5">{selectedProjectForDetail.startDate}</p>
                </div>
                <div>
                  <span className="font-semibold block text-neutral-900">End Date</span>
                  <p className="text-neutral-800 mt-0.5">{selectedProjectForDetail.targetEndDate}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-neutral-200 pt-4">
              <Button variant="secondary" size="sm" onClick={() => setSelectedProjectForDetail(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedProject(selectedProjectForDetail.id);
                  setSelectedProjectForDetail(null);
                }}
              >
                Switch to this Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
