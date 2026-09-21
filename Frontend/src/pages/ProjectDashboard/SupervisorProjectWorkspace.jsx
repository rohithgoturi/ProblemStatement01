/**
 * PragatiPath — Site Supervisor Project Workspace View
 * Selected project view for PS 26122 — Pump P-101
 * Focus: FIELD EXECUTION & PHYSICAL PROGRESS
 * - Current site & Unit 2 focus
 * - Today's physical activities checklist
 * - Reported quantities & field progress sliders
 * - Recent DPR submissions for PS 26122
 * - Site photos & physical inspection gallery
 * - Submit shift progress CTA
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCheckCircle, MdCameraAlt, MdSend, MdBuild
} from 'react-icons/md';

export function SupervisorProjectWorkspace({ projectHeader }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  const [fieldActivities, setFieldActivities] = useState([
    {
      id: 'A002-1',
      name: 'Pump Baseplate Leveling & Grouting',
      targetQty: '100%',
      actualQty: '100%',
      progress: 100,
      status: 'Completed',
      notes: 'Grout cured for 48h. Inspection passed.',
    },
    {
      id: 'A002-2',
      name: 'Pump & Motor Coupling Alignment',
      targetQty: '100%',
      actualQty: '75%',
      progress: 75,
      status: 'In Progress',
      notes: 'Dial indicator readings within 0.05mm tolerance.',
    },
    {
      id: 'A002-3',
      name: 'Suction & Discharge Flange Bolting',
      targetQty: '24 Bolts',
      actualQty: '18 Bolts',
      progress: 65,
      status: 'In Progress',
      notes: 'Waiting on 6 high-tensile studs.',
    },
    {
      id: 'A002-4',
      name: 'Lube Oil Line Flushing & Pressure Test',
      targetQty: '5.5 Bar',
      actualQty: '0 Bar',
      progress: 10,
      status: 'Delayed',
      notes: 'Flushing pump oil filter clogged.',
    },
  ]);

  const [sitePhotos] = useState([
    { id: 'p1', title: 'Pump Foundation Torquing', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=400&auto=format&fit=crop&q=80', time: '10 Sep · 10:15 AM' },
    { id: 'p2', title: 'Coupling Alignment Gauge', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&auto=format&fit=crop&q=80', time: '09 Sep · 04:30 PM' },
    { id: 'p3', title: 'Flange Gasket Fitting', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80', time: '08 Sep · 02:00 PM' },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateProgress = (id, newProgress) => {
    setFieldActivities((prev) =>
      prev.map((act) =>
        act.id === id
          ? {
              ...act,
              progress: newProgress,
              status: newProgress === 100 ? 'Completed' : 'In Progress',
            }
          : act
      )
    );
    showToast('Field progress updated');
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

      {/* Field Execution Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Field Execution Workspace</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {projectHeader.code} — {projectHeader.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit 2 · Mechanical Package • Site A • Lead Supervisor: Suresh Patel
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/dpr')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <MdSend size={15} />
            <span>Submit DPR for PS 26122</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards for Field Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Field Completion</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">68%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">3 of 4 Unit 2 subtasks on track</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Active Crew</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">6 Workers</div>
          <div className="text-[11px] text-slate-500 mt-0.5">4 mechanical fitters + 2 riggers</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Next Milestone</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">12 Sep 2026</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Cold run rotation inspection</div>
        </div>
      </div>

      {/* Main Field Execution Grid: Left Work Items | Right Site Photos & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (~65%): Today's Work Tasks on PS 26122 */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <MdBuild size={18} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Subtask Execution Checklist (Unit 2)
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Shift: Day Shift (08:00 - 17:00)
              </span>
            </div>

            <div className="space-y-3">
              {fieldActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-3 bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#0056D2]">{act.id}</span>
                        <h3 className="text-sm font-bold text-slate-900">{act.name}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{act.notes}</p>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                        act.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : act.status === 'Delayed'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {act.status}
                    </span>
                  </div>

                  {/* Quantity & Progress Control */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>Measured Progress: <strong className="text-slate-900">{act.actualQty}</strong> / {act.targetQty}</span>
                      <span className="font-bold text-slate-900">{act.progress}%</span>
                    </div>

                    {/* Progress Slider */}
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={act.progress}
                        onChange={(e) => handleUpdateProgress(act.id, Number(e.target.value))}
                        className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0056D2]"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateProgress(act.id, 100)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700"
                      >
                        100%
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (~35%): Site Photos & Recent Reports */}
        <div className="lg:col-span-4 space-y-6">
          {/* Site Photos Stream */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdCameraAlt className="text-[#0056D2]" size={18} />
                <h3 className="text-sm font-bold text-slate-900">Site Photos & Proof</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/dpr')}
                className="text-xs font-semibold text-[#0056D2] hover:underline"
              >
                + Add Photo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {sitePhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-xl border border-slate-200 overflow-hidden group shadow-2xs hover:shadow-xs transition-all"
                >
                  <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-medium">
                      {photo.time}
                    </div>
                  </div>
                  <div className="p-2.5 text-xs font-bold text-slate-800">
                    {photo.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
