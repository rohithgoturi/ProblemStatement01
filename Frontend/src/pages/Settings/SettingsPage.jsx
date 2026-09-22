/**
 * PragatiPath — Account Settings & Governance
 * Live Profile, Security/Password, RBAC Permissions, and Admin User Directory
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRole, ROLE_CONFIG, ROLES } from '../../context/RoleContext';
import { Avatar } from '../../components/shared/Avatar';
import {
  updateUserProfile,
  changePassword,
  getAdminUsers,
  updateUserRole,
} from '../../services/api';
import {
  MdPerson,
  MdSecurity,
  MdLock,
  MdCheckCircle,
  MdErrorOutline,
  MdSave,
  MdAdminPanelSettings,
  MdOutlineShield,
  MdKey,
  MdRefresh,
  MdInfoOutline,
} from 'react-icons/md';

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const { currentRole, currentProfile } = useRole();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  // Security Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securityMsg, setSecurityMsg] = useState({ type: '', text: '' });

  // Admin User Directory State
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [adminMsg, setAdminMsg] = useState({ type: '', text: '' });
  const [roleUpdatingId, setRoleUpdatingId] = useState(null);

  // Sync profile form when user object updates
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileAvatar(user.avatar || '');
    }
  }, [user]);

  // Fetch admin users if user is admin and clicks tab
  useEffect(() => {
    if (user?.role === ROLES.ADMIN && activeTab === 'admin') {
      loadAdminUsers();
    }
  }, [user, activeTab]);

  const loadAdminUsers = async () => {
    setLoadingUsers(true);
    setAdminMsg({ type: '', text: '' });
    try {
      const res = await getAdminUsers();
      const users = res.data?.users || (Array.isArray(res.data) ? res.data : []);
      setUsersList(users);
    } catch (err) {
      setAdminMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to load user list.',
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg({ type: '', text: '' });

    try {
      const res = await updateUserProfile({
        name: profileName.trim(),
        avatar: profileAvatar.trim(),
      });
      if (res.success) {
        setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
        await refreshUser();
      }
    } catch (err) {
      setProfileMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSecurityMsg({ type: '', text: '' });

    if (newPassword.length < 6) {
      setSecurityMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setSecuritySaving(true);
    try {
      const res = await changePassword(oldPassword, newPassword);
      if (res.success) {
        setSecurityMsg({ type: 'success', text: 'Password changed successfully!' });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setSecurityMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to change password.',
      });
    } finally {
      setSecuritySaving(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setRoleUpdatingId(userId);
    setAdminMsg({ type: '', text: '' });

    try {
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        setAdminMsg({ type: 'success', text: `User role updated to ${newRole}.` });
        setUsersList((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      setAdminMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update user role.',
      });
    } finally {
      setRoleUpdatingId(null);
    }
  };

  const roleConfig = ROLE_CONFIG[currentRole] || ROLE_CONFIG[ROLES.PROJECT_MANAGER];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MdSecurity className="text-[#0056D2]" size={28} />
          <span>Account Settings & Security</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal profile, security credentials, active role permissions, and access governance.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 mb-6 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#0056D2] text-[#0056D2]'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <MdPerson size={18} />
          <span>Profile & Identity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-[#0056D2] text-[#0056D2]'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <MdLock size={18} />
          <span>Security & Password</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('permissions')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'permissions'
              ? 'border-[#0056D2] text-[#0056D2]'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <MdOutlineShield size={18} />
          <span>Role & Permissions</span>
        </button>

        {user?.role === ROLES.ADMIN && (
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'admin'
                ? 'border-purple-600 text-purple-700 font-bold'
                : 'border-transparent text-purple-600 hover:text-purple-800 hover:border-purple-300'
            }`}
          >
            <MdAdminPanelSettings size={18} />
            <span>User Management (Admin)</span>
          </button>
        )}
      </div>

      {/* TAB 1: Profile & Identity */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative">
              <Avatar
                name={profileName || user?.name}
                src={profileAvatar || user?.avatar}
                size="2xl"
                className="shadow-md ring-4 ring-slate-100"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleConfig.badgeColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {roleConfig.label}
                </span>
                <span className="text-xs text-slate-400">Authenticated Session</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-5">
            {profileMsg.text && (
              <div
                className={`p-3.5 rounded-xl text-sm flex items-center gap-2.5 ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {profileMsg.type === 'success' ? (
                  <MdCheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                ) : (
                  <MdErrorOutline size={18} className="text-rose-600 flex-shrink-0" />
                )}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">Email is managed by system provisioning.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Profile Photo / Avatar URL (Optional)
              </label>
              <input
                type="url"
                value={profileAvatar}
                onChange={(e) => setProfileAvatar(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-colors"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Enter an HTTPS link to an avatar image, or leave empty to use auto-generated initials.
              </p>
            </div>

            {/* Read-only System Role */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Assigned Organization Role
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{roleConfig.label}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${roleConfig.badgeColor}`}>
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5">
                <MdInfoOutline className="text-slate-400 flex-shrink-0 mt-0.5" size={14} />
                <span>
                  Role assignments are managed strictly by organization administrators or authorized provisioning systems to uphold security compliance.
                </span>
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0056D2] hover:bg-[#1A73E8] disabled:bg-blue-300 text-white rounded-xl text-sm font-semibold shadow-xs transition-colors"
              >
                <MdSave size={18} />
                <span>{profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Change Account Password</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ensure your account is using a long, random password to protect operational schedule and report data.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5 max-w-xl">
            {securityMsg.text && (
              <div
                className={`p-3.5 rounded-xl text-sm flex items-center gap-2.5 ${
                  securityMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {securityMsg.type === 'success' ? (
                  <MdCheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                ) : (
                  <MdErrorOutline size={18} className="text-rose-600 flex-shrink-0" />
                )}
                <span>{securityMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-colors"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-colors"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-colors"
                placeholder="Re-enter new password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={securitySaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0056D2] hover:bg-[#1A73E8] disabled:bg-blue-300 text-white rounded-xl text-sm font-semibold shadow-xs transition-colors"
              >
                <MdKey size={18} />
                <span>{securitySaving ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>

          {/* Session Security Details */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Active Session & Security Specs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Authentication</span>
                <p className="text-xs font-bold text-slate-800 mt-1">JWT Bearer (Signed)</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Session Lifetime</span>
                <p className="text-xs font-bold text-slate-800 mt-1">7 Days Standard</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Audit Logging</span>
                <p className="text-xs font-bold text-emerald-600 mt-1">Enabled (Server-side)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Role & Permissions */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Active Role & Authorization Matrix</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              PragatiPath enforces server-authoritative Role-Based Access Control on every API request.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Current Assigned Role
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{roleConfig.label}</h3>
                <p className="text-xs text-slate-600 mt-1">{roleConfig.tagline}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleConfig.badgeColor}`}>
                {currentRole}
              </span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
            Module Capabilities & Access Rights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'submit_dpr',
                title: 'DPR Submission & Ingestion',
                desc: 'Upload daily progress reports, raw photos, and site logs.',
                roles: ['site_supervisor', 'planner', 'project_manager', 'admin'],
              },
              {
                id: 'view_schedule',
                title: 'Schedule & Activity Viewer',
                desc: 'Browse imported Primavera P6 / MS Project schedule hierarchy.',
                roles: ['site_supervisor', 'planner', 'project_manager', 'admin'],
              },
              {
                id: 'import_schedule',
                title: 'Schedule Baseline Import & Deletion',
                desc: 'Upload Primavera P6 XML/XER schedules and overwrite baseline.',
                roles: ['planner', 'project_manager', 'admin'],
              },
              {
                id: 'review_matches',
                title: 'AI Progress Approval & Schedule Linking',
                desc: 'Approve, adjust, or reject AI-matched progress into schedule.',
                roles: ['planner', 'project_manager', 'admin'],
              },
              {
                id: 'view_reports',
                title: 'Executive Analytics & Audit Reports',
                desc: 'Generate delay forensics, EVM metrics, and export audit trails.',
                roles: ['planner', 'project_manager', 'admin'],
              },
              {
                id: 'admin_governance',
                title: 'User Management & Role Governance',
                desc: 'View all accounts, modify user roles, and inspect security health.',
                roles: ['admin'],
              },
            ].map((cap) => {
              const hasAccess =
                currentRole === ROLES.ADMIN || cap.roles.includes(currentRole);
              return (
                <div
                  key={cap.id}
                  className={`p-4 rounded-xl border transition-all ${
                    hasAccess
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50/60 border-slate-200/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-800">{cap.title}</h4>
                    {hasAccess ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <MdCheckCircle size={14} /> Allowed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        Restricted
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: User Management (Admin Only) */}
      {activeTab === 'admin' && user?.role === ROLES.ADMIN && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MdAdminPanelSettings className="text-purple-600" size={22} />
                <span>Organization User Management</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign roles to users across PragatiPath. Role updates take effect on the user's next request.
              </p>
            </div>
            <button
              type="button"
              onClick={loadAdminUsers}
              disabled={loadingUsers}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              <MdRefresh size={16} className={loadingUsers ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {adminMsg.text && (
            <div
              className={`p-3.5 rounded-xl text-sm flex items-center gap-2.5 mb-4 ${
                adminMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {adminMsg.type === 'success' ? (
                <MdCheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
              ) : (
                <MdErrorOutline size={18} className="text-rose-600 flex-shrink-0" />
              )}
              <span>{adminMsg.text}</span>
            </div>
          )}

          {loadingUsers ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-3 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">Loading user directory...</p>
            </div>
          ) : usersList.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-sm">
              No registered users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3">User</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {usersList.map((u) => {
                    const isCurrentUser = u._id === user._id;
                    return (
                      <tr key={u._id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 font-medium text-slate-800 flex items-center gap-2.5">
                          <Avatar name={u.name} src={u.avatar} size="sm" />
                          <div className="min-w-0">
                            <span className="block truncate font-semibold text-slate-900">{u.name}</span>
                            {isCurrentUser && (
                              <span className="text-[10px] text-[#0056D2] font-semibold">(You)</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{u.email}</td>
                        <td className="py-3 px-3">
                          <select
                            value={u.role}
                            disabled={roleUpdatingId === u._id}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                          >
                            <option value={ROLES.SITE_SUPERVISOR}>site_supervisor</option>
                            <option value={ROLES.PLANNER}>planner</option>
                            <option value={ROLES.PROJECT_MANAGER}>project_manager</option>
                            <option value={ROLES.ADMIN}>admin</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right text-xs text-slate-400">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
