/**
 * PragatiPath — Project Team Directory
 * Connects to live registered team members via backend API.
 * Displays real user identities, verified roles, and deterministically generated avatars.
 * Zero fake personas, zero stock photos, zero fictional links.
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getTeamMembers } from '../../services/api';
import { Avatar } from '../../components/shared/Avatar';
import { ROLE_CONFIG, ROLES } from '../../context/RoleContext';
import {
  MdPeople,
  MdRefresh,
  MdShield,
  MdMailOutline,
  MdEngineering,
} from 'react-icons/md';

export default function TeamPage() {
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
      setError(err.response?.data?.message || err.message || 'Failed to load team data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MdPeople className="text-[#0056D2]" size={28} />
            <span>Project Team & Access Roster</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Registered project personnel authorized to manage schedules, submit DPRs, or review progress.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchTeam}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors self-start sm:self-auto"
        >
          <MdRefresh size={16} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-[#0056D2]/20 border-t-[#0056D2] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-medium">Loading project team directory...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
          <p className="font-bold">Error loading team roster:</p>
          <p className="mt-1 text-xs">{error}</p>
        </div>
      ) : members.length === 0 ? (
        <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
          <div className="w-16 h-16 bg-blue-50 border border-blue-100 text-[#0056D2] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MdPeople size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No team members found</h2>
          <p className="text-sm text-slate-600 mb-4">
            Team members will appear here as users register and are provisioned into the project.
          </p>
        </div>
      ) : (
        /* Real Team Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => {
            const isCurrentUser = member._id === currentUser?._id || member.email === currentUser?.email;
            const roleConfig = ROLE_CONFIG[member.role] || {
              label: member.role || 'Member',
              badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
              tagline: 'Project Contributor',
            };

            return (
              <div
                key={member._id || member.email}
                className={`p-6 rounded-2xl border transition-all ${
                  isCurrentUser
                    ? 'bg-blue-50/30 border-[#0056D2]/40 shadow-xs'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Avatar
                    name={member.name}
                    src={member.avatar}
                    size="lg"
                    className="shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {member.name}
                      </h3>
                      {isCurrentUser && (
                        <span className="text-[10px] font-bold text-[#0056D2] bg-blue-100/70 px-1.5 py-0.5 rounded">
                          You
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                      <MdMailOutline size={13} className="text-slate-400" />
                      <span>{member.email}</span>
                    </p>

                    <div className="mt-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleConfig.badgeColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {roleConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate">{roleConfig.tagline}</span>
                  <span className="text-[11px] text-slate-400 flex-shrink-0">
                    {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
