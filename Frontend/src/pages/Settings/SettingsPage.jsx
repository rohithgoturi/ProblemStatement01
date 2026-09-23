/**
 * PragatiPath — Account Settings & Governance
 * Clienter-inspired warm rounded cards, orange accents, and real user authentication.
 * Live Profile, Security/Password, RBAC Permissions, and Admin User Directory.
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
      const res = await changePassword({ currentPassword: oldPassword, newPassword });
      if (!res.error) {
        setSecurityMsg({ type: 'success', text: 'Password changed successfully!' });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setSecurityMsg({
          type: 'error',
          text: res.error || 'Failed to change password.',
        });
      }
    } catch (err) {
      setSecurityMsg({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to change password.',
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
    <div className="max-w-5xl mx-auto pb-16 font-sans">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20 mb-2">
          <span>GOVERNANCE & PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1320] flex items-center gap-2 tracking-tight">
          <MdSecurity className="text-[#FF5500]" size={28} />
          <span>Account Settings & Security</span>
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Manage your personal identity, security credentials, active role permissions, and access governance.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#E8E1D5] mb-6 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#FF5500] text-[#FF5500]'
              : 'border-transparent text-stone-600 hover:text-[#0B1320]'
          }`}
        >
          <MdPerson size={18} />
          <span>Profile & Identity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-[#FF5500] text-[#FF5500]'
              : 'border-transparent text-stone-600 hover:text-[#0B1320]'
          }`}
        >
          <MdLock size={18} />
          <span>Security & Password</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('permissions')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'permissions'
              ? 'border-[#FF5500] text-[#FF5500]'
              : 'border-transparent text-stone-600 hover:text-[#0B1320]'
          }`}
        >
          <MdOutlineShield size={18} />
          <span>Role & Permissions</span>
        </button>

        {user?.role === ROLES.ADMIN && (
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'admin'
                ? 'border-[#FF5500] text-[#FF5500]'
                : 'border-transparent text-stone-600 hover:text-[#0B1320]'
            }`}
          >
            <MdAdminPanelSettings size={18} />
            <span>User Management (Admin)</span>
          </button>
        )}
      </div>

      {/* TAB 1: Profile & Identity */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-2xs p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-stone-100">
            <div className="relative">
              <Avatar
                name={profileName || user?.name}
                src={profileAvatar || user?.avatar}
                size="2xl"
                className="shadow-md ring-4 ring-stone-100"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0B1320]">{user?.name}</h2>
              <p className="text-sm text-stone-500">{user?.email}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${roleConfig.badgeColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {roleConfig.label}
                </span>
                <span className="text-xs text-stone-400 font-medium">Authenticated Session</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-5">
            {profileMsg.text && (
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {profileMsg.type === 'success' ? (
                  <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                ) : (
                  <MdErrorOutline size={18} className="text-rose-600 shrink-0" />
                )}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-stone-100 text-stone-500 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-stone-400 mt-1">Email is verified & provisioned by organization admin.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Profile Photo / Avatar URL (Optional)
              </label>
              <input
                type="url"
                value={profileAvatar}
                onChange={(e) => setProfileAvatar(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Enter an HTTPS link to an avatar image, or leave empty to use auto-generated initials.
              </p>
            </div>

            {/* Read-only System Role */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Assigned Organization Role
                  </span>
                  <p className="text-sm font-semibold text-[#0B1320] mt-0.5">{roleConfig.label}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleConfig.badgeColor}`}>
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-2 flex items-start gap-1.5">
                <MdInfoOutline className="text-[#FF5500] shrink-0 mt-0.5" size={16} />
                <span>
                  Role assignments are managed strictly by organization administrators or authorized provisioning systems to uphold security compliance.
                </span>
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B1320] hover:bg-[#FF5500] disabled:bg-stone-300 text-white rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <MdSave size={16} />
                <span>{profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-2xs p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0B1320]">Change Account Password</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Ensure your account is using a long, random password to protect operational schedule and report data.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5 max-w-xl">
            {securityMsg.text && (
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 ${
                  securityMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {securityMsg.type === 'success' ? (
                  <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
                ) : (
                  <MdErrorOutline size={18} className="text-rose-600 shrink-0" />
                )}
                <span>{securityMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] text-sm text-[#0B1320] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 focus:bg-white transition-all"
                placeholder="Re-enter new password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={securitySaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B1320] hover:bg-[#FF5500] disabled:bg-stone-300 text-white rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <MdKey size={16} />
                <span>{securitySaving ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>

          {/* Session Security Details */}
          <div className="mt-10 pt-6 border-t border-stone-100">
            <h3 className="text-sm font-bold text-[#0B1320] mb-3">Active Session & Security Specs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                <span className="text-[11px] text-stone-400 uppercase font-semibold">Authentication</span>
                <p className="text-xs font-bold text-[#0B1320] mt-1">JWT Bearer (Signed)</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                <span className="text-[11px] text-stone-400 uppercase font-semibold">Session Lifetime</span>
                <p className="text-xs font-bold text-[#0B1320] mt-1">7 Days Standard</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                <span className="text-[11px] text-stone-400 uppercase font-semibold">Audit Logging</span>
                <p className="text-xs font-bold text-emerald-700 mt-1">Enabled (Server-side)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Role & Permissions */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-2xs p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0B1320]">Active Role & Authorization Matrix</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              PragatiPath enforces server-authoritative Role-Based Access Control on every API request.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                  Current Assigned Role
                </span>
                <h3 className="text-xl font-black text-[#0B1320] mt-0.5">{roleConfig.label}</h3>
                <p className="text-xs text-stone-600 mt-1">{roleConfig.tagline}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleConfig.badgeColor}`}>
                {currentRole}
              </span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">
            Module Capabilities & Access Rights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                  className={`p-5 rounded-2xl border transition-all ${
                    hasAccess
                      ? 'bg-white border-[#E8E1D5]'
                      : 'bg-[#FAF8F5]/60 border-[#E8E1D5]/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-sm font-bold text-[#0B1320]">{cap.title}</h4>
                    {hasAccess ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <MdCheckCircle size={14} /> Allowed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-400 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                        Restricted
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: User Management (Admin Only) */}
      {activeTab === 'admin' && user?.role === ROLES.ADMIN && (
        <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-2xs p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B1320] flex items-center gap-2">
                <MdAdminPanelSettings className="text-[#FF5500]" size={24} />
                <span>Organization User Management</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Assign roles to users across PragatiPath. Role updates take effect on the user's next request.
              </p>
            </div>
            <button
              type="button"
              onClick={loadAdminUsers}
              disabled={loadingUsers}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E1D5] hover:bg-[#FAF8F5] text-xs font-semibold text-[#0B1320] transition-colors"
            >
              <MdRefresh size={16} className={loadingUsers ? 'animate-spin text-[#FF5500]' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {adminMsg.text && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 mb-4 ${
                adminMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {adminMsg.type === 'success' ? (
                <MdCheckCircle size={18} className="text-emerald-600 shrink-0" />
              ) : (
                <MdErrorOutline size={18} className="text-rose-600 shrink-0" />
              )}
              <span>{adminMsg.text}</span>
            </div>
          )}

          {loadingUsers ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-3 border-stone-200 border-t-[#FF5500] rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-stone-500">Loading user directory...</p>
            </div>
          ) : usersList.length === 0 ? (
            <div className="py-10 text-center text-stone-500 text-sm">
              No registered users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E1D5] text-[11px] font-bold text-stone-400 uppercase tracking-wider bg-[#FAF8F5]">
                    <th className="py-3 px-3">User</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {usersList.map((u) => {
                    const isCurrentUser = u._id === user._id;
                    return (
                      <tr key={u._id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3 px-3 font-medium text-stone-800 flex items-center gap-2.5">
                          <Avatar name={u.name} src={u.avatar} size="sm" />
                          <div className="min-w-0">
                            <span className="block truncate font-semibold text-[#0B1320]">{u.name}</span>
                            {isCurrentUser && (
                              <span className="text-[10px] text-[#FF5500] font-semibold">(You)</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-stone-600 text-xs">{u.email}</td>
                        <td className="py-3 px-3">
                          <select
                            value={u.role}
                            disabled={roleUpdatingId === u._id}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#FF5500] transition-colors"
                          >
                            <option value={ROLES.SITE_SUPERVISOR}>site_supervisor</option>
                            <option value={ROLES.PLANNER}>planner</option>
                            <option value={ROLES.PROJECT_MANAGER}>project_manager</option>
                            <option value={ROLES.ADMIN}>admin</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right text-xs text-stone-400">
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
