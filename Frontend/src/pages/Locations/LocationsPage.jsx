/**
 * PragatiPath — Project Locations & Work Areas
 * Connects to real schedule activity data from the backend.
 * Renders verified project work areas or displays a clean empty state if none are defined.
 * Zero fake cities, zero mock GPS coordinates, zero fake maps.
 */
import { useState, useEffect, useMemo } from 'react';
import { getScheduleActivities } from '../../services/api';
import {
  MdLocationOn,
  MdRefresh,
  MdLayers,
  MdEngineering,
  MdInfoOutline,
} from 'react-icons/md';

export default function LocationsPage() {
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
    <div className="max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MdLocationOn className="text-[#0056D2]" size={28} />
            <span>Project Locations & Work Areas</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Work areas, bays, and site locations defined in the imported project schedule.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLocations}
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
          <p className="text-sm text-slate-500 font-medium">Loading project location data...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
          <p className="font-bold">Error loading locations:</p>
          <p className="mt-1 text-xs">{error}</p>
        </div>
      ) : locationsMap.length === 0 ? (
        /* Explicit Requirement: Clean empty state with zero fake data */
        <div className="max-w-xl mx-auto my-12 p-8 sm:p-12 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
          <div className="w-16 h-16 bg-blue-50 border border-blue-100 text-[#0056D2] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MdLocationOn size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            No project locations have been added yet.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
            Locations and work areas are extracted automatically when project schedule activities or daily progress reports specify a location or work area (e.g. Unit 2, Pump House, Pier 14).
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2 text-left">
            <MdInfoOutline size={16} className="text-[#0056D2] flex-shrink-0 mt-0.5" />
            <span>
              To view location breakdowns, ensure your imported schedule file includes a <strong>location</strong> column or field in the activity list.
            </span>
          </div>
        </div>
      ) : (
        /* Real Locations Grid */
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsMap.map((loc) => {
              const pct = loc.total > 0 ? Math.round((loc.completed / loc.total) * 100) : 0;
              const isSelected = selectedLocation === loc.name;

              return (
                <div
                  key={loc.name}
                  onClick={() => setSelectedLocation(isSelected ? null : loc.name)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/50 border-[#0056D2] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0056D2] flex items-center justify-center">
                        <MdLayers size={18} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{loc.name}</h3>
                    </div>
                    <span className="text-xs font-bold text-[#0056D2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {loc.total} {loc.total === 1 ? 'Activity' : 'Activities'}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Progress</span>
                      <span className="font-bold text-slate-800">{pct}% Complete</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
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
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MdEngineering className="text-[#0056D2]" />
                <span>Activities in {selectedLocation}</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-2.5 px-3">Activity ID</th>
                      <th className="py-2.5 px-3">Activity Name</th>
                      <th className="py-2.5 px-3">Discipline</th>
                      <th className="py-2.5 px-3">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {locationsMap
                      .find((l) => l.name === selectedLocation)
                      ?.activities.map((act) => (
                        <tr key={act._id || act.activityId} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">
                            {act.activityId}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {act.activityName}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            {act.discipline || 'General'}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-[#0056D2]">
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
  );
}
