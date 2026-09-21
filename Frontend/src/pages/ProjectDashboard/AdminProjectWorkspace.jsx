/**
 * PragatiPath — System Administrator Project Workspace View
 * Selected project view for PS 26122 — Pump P-101
 * Focus: PROJECT GOVERNANCE, ACCESS CONTROL & DATA INTEGRITY
 * - Project metadata & technical configuration
 * - Project user assignment & role access matrix
 * - Data integrity & audit logs for PS 26122
 * - Archive / export project dataset
 */
import { useState } from 'react';
import {
  MdSecurity, MdPeople, MdCheckCircle,
  MdDownload, MdKey
} from 'react-icons/md';

export function AdminProjectWorkspace({ projectHeader }) {
  const [toastMessage, setToastMessage] = useState(null);

  const [projectTeam] = useState([
    { id: 'tm-1', name: 'Rahul Sharma', role: 'Project Manager', permission: 'Full Executive Admin', status: 'Active' },
    { id: 'tm-2', name: 'Raghav Sharma', role: 'Project Planner', permission: 'Schedule & Match Approval', status: 'Active' },
    { id: 'tm-3', name: 'Suresh Patel', role: 'Site Supervisor', permission: 'Field DPR Submission Only', status: 'Active' },
    { id: 'tm-4', name: 'Neha Singh', role: 'Site Engineer', permission: 'Field DPR Submission Only', status: 'Active' },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Project Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>Project Governance Workspace</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {projectHeader.code} — Configuration & Access
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Security Tier: Level 2 Sensitive Infrastructure • Data Sync: 100% Consistent
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => showToast('Exporting complete project audit package (JSON + CSV)')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
          >
            <MdDownload size={15} />
            <span>Export Archive</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Opening Project Access Permissions Dialog')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md shadow-purple-900/20 transition-all active:scale-95 cursor-pointer"
          >
            <MdKey size={15} />
            <span>Manage Permissions</span>
          </button>
        </div>
      </div>

      {/* Project Metadata Specs Card */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Contractor / Lead EPC</div>
          <div className="text-sm font-bold text-slate-900 mt-1">L&T Construction Ltd.</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Contract ID: LNT-IN-2026-992</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Capital Budget</div>
          <div className="text-sm font-bold text-slate-900 mt-1">₹142.50 Cr</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Disbursed: ₹98.2 Cr (68%)</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Data Repository</div>
          <div className="text-sm font-bold text-slate-900 mt-1">AWS ap-south-1</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">AES-256 Encrypted</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Baseline Revision</div>
          <div className="text-sm font-bold text-slate-900 mt-1">Rev 2 (10 Sep 2026)</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Uploaded via Primavera XER</div>
        </div>
      </div>

      {/* Main Grid: Left User Assignment Matrix | Right Project Security & Integrity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (~65%): Project Team Access Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                  <MdPeople size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Assigned Team & Role Permissions (PS 26122)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening assign member modal')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                + Assign User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2">User Name</th>
                    <th className="pb-2">System Role</th>
                    <th className="pb-2">Access Scope</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projectTeam.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-bold text-slate-900">{member.name}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600 font-medium">{member.permission}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => showToast(`Permissions configured for ${member.name}`)}
                          className="text-xs text-[#0056D2] font-semibold hover:underline"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right (~35%): Data Integrity & Sync Health */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MdSecurity className="text-emerald-600" size={18} />
              <span>Project Data Integrity</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Schedule Sync Check</span>
                  <span className="text-emerald-600">✓ 100% Matched</span>
                </div>
                <p className="text-[11px] text-slate-500">124 activities reconciled against baseline schema.</p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>DPR Document Checksum</span>
                  <span className="text-emerald-600">✓ Validated</span>
                </div>
                <p className="text-[11px] text-slate-500">SHA-256 signatures verified for 24 DPR attachments.</p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Audit Trail Immutability</span>
                  <span className="text-emerald-600">✓ Locked</span>
                </div>
                <p className="text-[11px] text-slate-500">Change logs cryptographically sealed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
