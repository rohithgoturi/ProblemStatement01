/**
 * PragatiPath — Project Locations & Work Areas
 * Connects to real schedule activity data from the backend.
 * Renders verified project work areas or displays a clean empty state if none are defined.
 * Zero fake cities, zero mock GPS coordinates, zero fake maps.
 */
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getScheduleActivities } from '../../services/api';
import { PublicPageHeader } from '../../components/shared/PublicPageHeader';
import { NetworkLines } from '../../components/shared/NetworkLines';
import {
  MdLocationOn,
  MdRefresh,
  MdLayers,
  MdEngineering,
  MdInfoOutline,
  MdArrowForward,
} from 'react-icons/md';

export default function LocationsPage({ isPublic = false }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getScheduleActivities();
      // Handle both { data: [...] } and direct array
      const items = res?.data || (Array.isArray(res) ? res : []);
      setActivities(Array.isArray(items) ? items : []);
    } catch (err) {
      setError(err.message || 'Failed to load project location data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Group activities by valid location string
  const locationsMap = useMemo(() => {
    const map = {};
    activities.forEach((act) => {
      const loc = act.location?.trim();
      if (loc) {
        if (!map[loc]) {
          map[loc] = {
            name: loc,
            activities: [],
            total: 0,
            completed: 0,
            inProgress: 0,
          };
        }
        map[loc].activities.push(act);
        map[loc].total += 1;
        if (act.actualFinishDate || act.progressPercentage >= 100) {
          map[loc].completed += 1;
        } else if (act.actualStartDate) {
          map[loc].inProgress += 1;
        }
      }
    });
    return Object.values(map);
  }, [activities]);

  return (
    <div className="pb-20">
      {/* If rendered publicly, use the full PublicPageHeader */}
      {isPublic ? (
        <PublicPageHeader
          badge="SITE & FIELD WORK AREAS"
          title="Project Locations"
          description="Verified work areas, sections, and site zones linked directly from imported schedule activities."
        />
      ) : (
        /* Authenticated Header inside AppShell */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20 mb-2">
                <span>PROJECT GEOGRAPHY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1320] flex items-center gap-2 tracking-tight">
                <MdLocationOn className="text-[#FF5500]" size={28} />
                <span>Project Locations & Work Areas</span>
              </h1>
              <p className="text-sm text-stone-600 mt-1">
                Work areas, bays, and site locations defined in the imported project schedule.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchLocations}
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
            <p className="text-sm text-stone-600 font-medium">Loading project location data...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm max-w-xl mx-auto my-12">
            <p className="font-bold">Error loading locations:</p>
            <p className="mt-1 text-xs">{error}</p>
          </div>
        ) : locationsMap.length === 0 ? (
          /* Explicit Requirement: Clean intentional empty state with zero fake data */
          <div className="relative max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-[#FAF8F5] border border-[#E8E1D5] rounded-3xl text-center overflow-hidden shadow-sm">
            {/* Subtle background technical grid & network lines */}
            <div className="absolute inset-0 bg-technical-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <NetworkLines />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
                <MdLocationOn size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#0B1320] mb-3 tracking-tight">
                Project locations will appear here when connected to your project data.
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-6">
                Locations and work areas are extracted automatically when project schedule activities or daily progress reports specify a location or work area (e.g. Unit 2, Pump House, Pier 14).
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] text-xs text-stone-600 flex items-start gap-2.5 text-left max-w-lg mx-auto mb-6 shadow-2xs">
                <MdInfoOutline size={18} className="text-[#FF5500] flex-shrink-0 mt-0.5" />
                <span>
                  To view location breakdowns, ensure your imported schedule file includes a <strong>location</strong> column or field in the activity list.
                </span>
              </div>

              {isPublic && (
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1320] text-white text-xs font-bold hover:bg-[#FF5500] transition-colors shadow-sm"
                  >
                    <span>Sign In to Connect Schedule</span>
                    <MdArrowForward size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Real Locations Grid */
          <div className="space-y-8 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationsMap.map((loc) => {
                const pct = loc.total > 0 ? Math.round((loc.completed / loc.total) * 100) : 0;
                const isSelected = selectedLocation === loc.name;

                return (
                  <div
                    key={loc.name}
                    onClick={() => setSelectedLocation(isSelected ? null : loc.name)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#FF5500] shadow-md ring-2 ring-[#FF5500]/10'
                        : 'bg-white border-[#E8E1D5] hover:border-[#FF5500]/50 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center">
                          <MdLayers size={20} />
                        </div>
                        <h3 className="text-base font-bold text-[#0B1320]">{loc.name}</h3>
                      </div>
                      <span className="text-xs font-bold text-[#FF5500] bg-[#FF5500]/10 px-3 py-1 rounded-full border border-[#FF5500]/20">
                        {loc.total} {loc.total === 1 ? 'Activity' : 'Activities'}
                      </span>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Progress</span>
                        <span className="font-bold text-[#0B1320] text-sm">{pct}% Complete</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Status</span>
                        <span className="font-semibold text-emerald-700">
                          {loc.completed} Done · {loc.inProgress} In Progress
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location Activities Detail List */}
            {selectedLocation && (
              <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-xs p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-[#0B1320] flex items-center gap-2">
                    <MdEngineering className="text-[#FF5500]" size={20} />
                    <span>Activities in {selectedLocation}</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(null)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-800"
                  >
                    Close
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#E8E1D5] text-stone-400 uppercase tracking-wider font-bold">
                        <th className="py-3 px-3">Activity ID</th>
                        <th className="py-3 px-3">Activity Name</th>
                        <th className="py-3 px-3">Discipline</th>
                        <th className="py-3 px-3">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {locationsMap
                        .find((l) => l.name === selectedLocation)
                        ?.activities.map((act) => (
                          <tr key={act._id || act.activityId} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="py-3 px-3 font-mono font-semibold text-[#0B1320]">
                              {act.activityId}
                            </td>
                            <td className="py-3 px-3 font-medium text-[#0B1320]">
                              {act.activityName}
                            </td>
                            <td className="py-3 px-3 text-stone-600">
                              {act.discipline || 'General'}
                            </td>
                            <td className="py-3 px-3 font-bold text-[#FF5500]">
                              {act.progressPercentage || 0}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
