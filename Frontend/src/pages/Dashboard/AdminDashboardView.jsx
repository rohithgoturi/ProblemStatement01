/**
 * PragatiPath — System Administrator Main Dashboard View
 * Focus: PLATFORM GOVERNANCE & ACCESS CONTROL
 * - Total projects & active user metrics
 * - User Access & Permissions Directory
 * - System Audit Logs & Data Sync Health
 * - Primary CTA: 'Manage Users'
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdPeople, MdCheckCircle,
  MdPersonAdd, MdSecurity, MdHistory,
  MdMoreVert, MdAdminPanelSettings
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  adminMetrics,
  adminUsersList,
  adminSystemAuditLogs,
} from '../../data/roleDashboardData';

export function AdminDashboardView() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(adminUsersList);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    showToast('User access status updated');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. STANDARDIZED ADMIN PAGE HEADER */}
      <PageHeader
        title="System Administrator Console"
        subtitle="Tenant: PragatiPath Enterprise Cloud • AI Pipeline Active • 28 Active Team Members"
        icon={<MdAdminPanelSettings />}
        actions={
          <>
            <button
              type="button"
              onClick={() => showToast('Opening User Provisioning Modal')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0056D2] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MdPersonAdd size={16} />
              <span>Manage Users</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>Security Settings</span>
            </button>
          </>
        }
      />

      {/* 2. ADMIN 4 KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminMetrics.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2 hover:border-purple-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{kpi.title}</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">
                {kpi.badge}
              </span>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900 leading-none">
                {kpi.value}
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                {kpi.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ADMIN MAIN CONTENT: Left User Directory | Right System Logs & Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT (~65%): User Directory & Project Access Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                  <MdPeople size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">User Access & Role Matrix</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                  {users.length} Team Members
                </span>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening invite user workflow')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                + Invite User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2">User Profile</th>
                    <th className="pb-2">Assigned Role</th>
                    <th className="pb-2">Project Access</th>
                    <th className="pb-2">Last Active</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={usr.avatar}
                            alt={usr.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{usr.name}</div>
                            <div className="text-[11px] text-slate-400">{usr.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            usr.roleKey === 'admin'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : usr.roleKey === 'project_manager'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : usr.roleKey === 'planner'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {usr.role}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-slate-700">
                        {usr.projectsCount} {typeof usr.projectsCount === 'number' ? 'Projects' : ''}
                      </td>
                      <td className="py-3 text-slate-500">{usr.lastActive}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            usr.status === 'Active' || usr.status === 'Superadmin'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {usr.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleUserStatus(usr.id)}
                            className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 text-slate-600 font-medium text-[11px]"
                          >
                            {usr.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                          <button
                            type="button"
                            onClick={() => showToast(`User options for ${usr.name}`)}
                            className="p-1 text-slate-400 hover:text-slate-600"
                          >
                            <MdMoreVert size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT (~35%): System Event Logs & Security Health */}
        <div className="lg:col-span-4 space-y-6">
          {/* System Event Audit Log */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdHistory className="text-purple-600" size={18} />
                <h3 className="text-sm font-bold text-slate-900">System Audit Trail</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Live Sync</span>
            </div>

            <div className="space-y-2">
              {adminSystemAuditLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900 text-[10px] uppercase bg-purple-100/70 px-1.5 py-0.2 rounded">
                      {log.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                  </div>
                  <p className="text-slate-700 font-medium leading-tight">{log.action}</p>
                  <p className="text-[10px] text-slate-400">By: {log.user}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health Checklist */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MdSecurity className="text-emerald-600" size={18} />
              <span>Platform Health & Security</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">AI Extraction Microservice</span>
                <span className="text-emerald-600 font-bold">Online (v2.4)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">PostgreSQL Primary Read/Write</span>
                <span className="text-emerald-600 font-bold">Healthy (8ms)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Object Storage Quota</span>
                <span className="text-slate-800 font-semibold">1.4 / 10 GB (14%)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">SSL / TLS Termination</span>
                <span className="text-emerald-600 font-bold">Valid (312 days)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
