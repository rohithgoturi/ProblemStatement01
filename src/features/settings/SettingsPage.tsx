import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/TopCommandBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDemoStore } from '@/store/demoStore';
import { RotateCcw, Sliders, Cpu, Bell, Shield, Check } from 'lucide-react';

export default function SettingsPage() {
  const { resetDemo } = useDemoStore();
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [chainageTolerance, setChainageTolerance] = useState(50);
  const [hinglishSupport, setHinglishSupport] = useState(true);
  const [varianceAlerts, setVarianceAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo state (matches, DPR inputs, exception clearances) back to factory demo defaults?')) {
      resetDemo();
      alert('Demo data has been reset to baseline.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="System Settings & Governance"
        subtitle="Configure matching parameters, tolerances, field OCR modes, and presentation demo state."
        breadcrumb={[
          { label: 'Workspace', href: '/workspace' },
          { label: 'Settings' },
        ]}
      />

      {/* AI Matching Parameters */}
      <Card className="p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="text-primary" size={18} />
          <h2 className="text-base font-bold text-neutral-900">AI Reasoning & Match Engine Rules</h2>
        </div>

        <div className="space-y-5 text-sm">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="conf-slider" className="font-semibold text-neutral-800">
                Auto-Verification Confidence Threshold
              </label>
              <span className="font-mono font-bold text-primary">{confidenceThreshold}%</span>
            </div>
            <p className="text-xs text-neutral-500 mb-2">
              Matches scoring below this threshold require human supervisory review before milestone status is advanced.
            </p>
            <input
              id="conf-slider"
              type="range"
              min="60"
              max="98"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200/80">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="chainage-tol" className="font-semibold text-neutral-800">
                Linear Chainage Tolerance Window
              </label>
              <span className="font-mono font-bold text-primary">±{chainageTolerance} meters</span>
            </div>
            <p className="text-xs text-neutral-500 mb-2">
              Maximum allowable delta between geo-referenced DPR coordinates and planned WBS chainage extents.
            </p>
            <input
              id="chainage-tol"
              type="range"
              min="10"
              max="200"
              step="5"
              value={chainageTolerance}
              onChange={(e) => setChainageTolerance(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </Card>

      {/* Field DPR & Multilingual */}
      <Card className="p-6 border border-neutral-200">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="text-primary" size={18} />
          <h2 className="text-base font-bold text-neutral-900">DPR Processing & NLP Preferences</h2>
        </div>

        <div className="space-y-4 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hinglishSupport}
              onChange={(e) => setHinglishSupport(e.target.checked)}
              className="mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4"
            />
            <div>
              <span className="font-semibold text-neutral-800 block">Enable Hinglish & Multilingual Lexicon Normalization</span>
              <span className="text-xs text-neutral-500">
                Maps vernacular terms like 'Chipping', 'Raft Dhalai', and 'Shuttering open' directly to standard NHIDCL/IRC task codes.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={varianceAlerts}
              onChange={(e) => setVarianceAlerts(e.target.checked)}
              className="mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4"
            />
            <div>
              <span className="font-semibold text-neutral-800 block">Critical Path Delay Automated Escalations</span>
              <span className="text-xs text-neutral-500">
                Flag discrepancies immediately to the Chief Project Director when variance exceeds 3 calendar days on critical path items.
              </span>
            </div>
          </label>
        </div>
      </Card>

      {/* Demo Controls */}
      <Card className="p-6 border border-warning-border bg-warning-surface/30">
        <div className="flex items-center gap-2 mb-2">
          <RotateCcw className="text-warning-on" size={18} />
          <h2 className="text-base font-bold text-neutral-900">Presentation Demo Management</h2>
        </div>
        <p className="text-xs text-neutral-600 mb-4">
          Reset all in-memory mock states (unresolved exceptions, simulated match confirmations, and DPR submissions) back to their fresh evaluation state.
        </p>

        <Button variant="secondary" size="sm" onClick={handleReset} className="border-warning-border text-neutral-900">
          <RotateCcw size={14} className="mr-1.5" />
          Reset Demo State to Baseline
        </Button>
      </Card>

      <div className="flex items-center justify-end gap-3 pt-2">
        {saved && (
          <span className="text-xs text-success font-medium flex items-center gap-1">
            <Check size={14} /> Settings Saved
          </span>
        )}
        <Button variant="primary" size="md" onClick={handleSave}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
