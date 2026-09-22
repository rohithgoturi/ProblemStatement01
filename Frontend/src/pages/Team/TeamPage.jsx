/**
 * PragatiPath — Project Team Directory
 * Connects to live registered team members via backend API.
 * Displays real user identities, verified roles, and deterministically generated avatars.
 * Zero fake personas, zero stock photos, zero fictional links.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getTeamMembers } from '../../services/api';
import { Avatar } from '../../components/shared/Avatar';
import { ROLE_CONFIG } from '../../context/RoleContext';
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdPeople,
  MdRefresh,
  MdMailOutline,
  MdArrowForward,
  MdInfoOutline,
} from 'react-icons/md';

export default function TeamPage({ isPublic = false }) {
  const { user: currentUser } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeam = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTeamMembers();
      // Handle res.data.members or res.data as array
      const list = res?.data?.members || res?.data || (Array.isArray(res) ? res : []);
      setMembers(Array.isArray(list) ? list : []);
    } catch (err) {
      // If unauthenticated or request fails, handle gracefully
      if (err.response?.status === 401) {
        setMembers([]);
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to load team data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="pb-20">
      {/* If rendered publicly, use the full PublicPageHeader */}
      {isPublic ? (
        <PublicPageHeader
          badge="ENGINEERING & OVERSIGHT"
          title="Project Team Roster"
          description="Authorized project personnel, planners, site engineers, and managers responsible for schedule integrity."
        />
      ) : (
        /* Authenticated Header inside AppShell */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20 mb-2">
                <span>COLLABORATION & ACCESS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1320] flex items-center gap-2 tracking-tight">
                <MdPeople className="text-[#FF5500]" size={28} />
                <span>Project Team & Access Roster</span>
              </h1>
              <p className="text-sm text-stone-600 mt-1">
                Registered project personnel authorized to manage schedules, submit DPRs, or review progress.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchTeam}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E1D5] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#0B1320] transition-colors self-start sm:self-auto shadow-2xs"
            >
              <MdRefresh size={16} className={loading ? 'animate-spin text-[#FF5500]' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-3 border-[#FF5500]/20 border-t-[#FF5500] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-stone-600 font-medium">Loading project team directory...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm max-w-xl mx-auto my-12">
            <p className="font-bold">Error loading team roster:</p>
            <p className="mt-1 text-xs">{error}</p>
          </div>
        ) : members.length === 0 ? (
          /* Explicit Requirement: Intentional empty state with zero fake team personas */
          <div className="relative max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-[#FAF8F5] border border-[#E8E1D5] rounded-3xl text-center overflow-hidden shadow-sm">
            {/* Subtle background technical grid & network lines */}
            <div className="absolute inset-0 bg-technical-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <NetworkLines />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
                <MdPeople size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#0B1320] mb-3 tracking-tight">
                Your project team will appear here when team members are connected.
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-6">
                Team members are provisioned into PragatiPath through verified engineering roles (Planner, Project Manager, Site Engineer, Supervisor) to enforce human-in-the-loop review governance.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] text-xs text-stone-600 flex items-start gap-2.5 text-left max-w-lg mx-auto mb-6 shadow-2xs">
                <MdInfoOutline size={18} className="text-[#FF5500] flex-shrink-0 mt-0.5" />
                <span>
                  Team directories are secured by server-side Role-Based Access Control (RBAC). Only verified personnel authorized for this project are displayed.
                </span>
              </div>

              {isPublic && (
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1320] text-white text-xs font-bold hover:bg-[#FF5500] transition-colors shadow-sm"
                  >
                    <span>Sign In to View Team Directory</span>
                    <MdArrowForward size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Real Team Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {members.map((member) => {
              const isCurrentUser = member._id === currentUser?._id || member.email === currentUser?.email;
              const roleConfig = ROLE_CONFIG[member.role] || {
                label: member.role || 'Member',
                badgeColor: 'bg-stone-100 text-stone-700 border-stone-200',
                tagline: 'Project Contributor',
              };

              return (
                <div
                  key={member._id || member.email}
                  className={`p-6 rounded-3xl border transition-all ${
                    isCurrentUser
                      ? 'bg-white border-[#FF5500]/60 shadow-md ring-2 ring-[#FF5500]/10'
                      : 'bg-white border-[#E8E1D5] shadow-2xs hover:shadow-xs hover:border-[#FF5500]/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      name={member.name}
                      src={member.avatar}
                      size="lg"
                      className="shadow-2xs border border-[#E8E1D5]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#0B1320] truncate">
                          {member.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="text-[10px] font-bold text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded-full border border-[#FF5500]/20">
                            You
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-1">
                        <MdMailOutline size={14} className="text-stone-400 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </p>

                      <div className="mt-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${roleConfig.badgeColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {roleConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="truncate font-medium">{roleConfig.tagline}</span>
                    <span className="text-[11px] text-stone-400 flex-shrink-0">
                      {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'Active'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
