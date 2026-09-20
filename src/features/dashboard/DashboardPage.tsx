import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  FileText,
  Layers,
  Flame,
  Clock,
  ChevronDown,
  Plus,
  Upload,
  BarChart2,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDemoStore } from '@/store/demoStore';

// ============================================================
// PROJECTAI BRIDGE — Main Dashboard
// Primary Visual Reference: Reference Image 1
// Layout:
// Row 1: Overall Progress & Summary KPIs + Project Overview Unit Card
// Row 2: Planned vs Actual S-Curve + Delayed Activities + Verification Pending
// Row 3: Gantt Chart Timeline + Recent Activity + Quick Actions
// ============================================================

const SCURVE_DATA = [
  { date: '1 Sep', planned: 5, actual: 3 },
  { date: '3 Sep', planned: 18, actual: 12 },
  { date: '5 Sep', planned: 28, actual: 20 },
  { date: '7 Sep', planned: 40, actual: 32 },
  { date: '10 Sep', planned: 58, actual: 48 },
  { date: '12 Sep', planned: 72, actual: 62 },
  { date: '15 Sep', planned: 86, actual: 72 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { exceptions } = useDemoStore();
  const [selectedUnit, setSelectedUnit] = useState('Unit 2 - Pump Installation');

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-10 font-sans">
      
      {/* ============================================================
          PAGE HEADER (Matches Image 1)
          ============================================================ */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0B192C] tracking-tight">
          Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Project Overview
        </p>
      </div>

      {/* ============================================================
          ROW 1: Overall Progress Donut + Project Overview Card
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Overall Progress Card (~7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            {/* Total Projects */}
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Projects</p>
              <p className="text-3xl font-extrabold text-[#0B192C] tracking-tight mt-0.5">12</p>
            </div>

            {/* Donut Progress Ring */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    className="text-emerald-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Active Progress Arc (68%) */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="68, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-extrabold text-sm text-[#0B192C]">
                  68%
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-[#0B192C]">Overall Progress</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scope: <span className="font-semibold text-slate-700">30</span> • Completed: <span className="font-semibold text-slate-700">6</span> • Ongoing: <span className="font-semibold text-slate-700">4</span>
                </p>
              </div>
            </div>
          </div>

          {/* 4 Colored Status Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {/* Completed */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                %
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Completed</p>
                <p className="text-lg font-extrabold text-[#0B192C] leading-none mt-0.5">42</p>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Layers size={16} />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">In Progress</p>
                <p className="text-lg font-extrabold text-blue-600 leading-none mt-0.5">18</p>
              </div>
            </div>

            {/* Delayed */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Flame size={16} />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Delayed</p>
                <p className="text-lg font-extrabold text-rose-600 leading-none mt-0.5">6</p>
              </div>
            </div>

            {/* Verification Pending */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Verification Pending</p>
                <p className="text-lg font-extrabold text-amber-600 leading-none mt-0.5">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Project Overview Spotlight Card (~5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-bold text-[#0B192C]">Project Overview</h3>
            <div className="relative">
              <button
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                <span>{selectedUnit}</span>
                <ChevronDown size={13} className="text-slate-500" />
              </button>
            </div>
          </div>

          {/* Plant Photo + Details */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/pump-installation.jpg"
              alt="Pump Installation Site"
              className="w-20 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
            />
            <div>
              <h4 className="text-sm font-extrabold text-[#0B192C]">Pump P-101 Installation</h4>
              <p className="text-xs text-slate-500 mt-0.5">Unit 2 • Mechanical</p>
              <div className="mt-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#0062FF] border border-blue-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0062FF]"></span>
                  In Progress
                </span>
              </div>
            </div>
          </div>

          {/* 4 Date Metrics */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Planned Start</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">01 Sep 2025</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Planned End</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">15 Oct 2025</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Actual Start</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">03 Sep 2025</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Actual End</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">-</p>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================
          ROW 2: Planned vs Actual (S-Curve) + Delayed Activities + Verification Pending
          ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Planned vs Actual Progress (S-Curve) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#0B192C]">Planned vs Actual Progress</h3>
            <Link to="/progress" className="text-xs font-semibold text-[#0062FF] hover:underline">
              View All
            </Link>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs mb-3">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#0062FF]"></span>
              <span>Planned</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Actual</span>
            </div>
          </div>

          {/* Line Chart */}
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SCURVE_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
                  tickFormatter={(val) => `${val}%`}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: number) => [`${val}%`, '']}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="#0062FF"
                  strokeWidth={2}
                  dot={{ fill: '#0062FF', r: 3 }}
                  name="Planned"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 3 }}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Delayed Activities Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#0B192C]">Delayed Activities</h3>
            <Link to="/progress" className="text-xs font-semibold text-[#0062FF] hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Activity</th>
                  <th className="pb-2">Delay</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-2 font-mono text-slate-600">P-101</td>
                  <td className="py-2 text-slate-800">Pump Installation</td>
                  <td className="py-2 text-rose-600 font-bold">+2 days</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      Delayed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-slate-600">G-102</td>
                  <td className="py-2 text-slate-800">Cable Laying</td>
                  <td className="py-2 text-amber-600 font-bold">+1 day</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      At Risk
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-slate-600">M-104</td>
                  <td className="py-2 text-slate-800">Motor Alignment</td>
                  <td className="py-2 text-rose-600 font-bold">+3 days</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      Delayed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-slate-600">S-118</td>
                  <td className="py-2 text-slate-800">Structural Work</td>
                  <td className="py-2 text-amber-600 font-bold">+1 day</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      At Risk
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 3: Verification Pending Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#0B192C]">Verification Pending</h3>
            <Link to="/ai-matching" className="text-xs font-semibold text-[#0062FF] hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Activity</th>
                  <th className="pb-2">Submitted On</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-2 font-mono text-slate-600">P-101</td>
                  <td className="py-2 text-slate-800">Pump Installation</td>
                  <td className="py-2 text-slate-500">10 Sep 2025</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-slate-600">G-102</td>
                  <td className="py-2 text-slate-800">Cable Laying</td>
                  <td className="py-2 text-slate-500">09 Sep 2025</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-slate-600">M-104</td>
                  <td className="py-2 text-slate-800">Motor Alignment</td>
                  <td className="py-2 text-slate-500">09 Sep 2025</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-slate-600">S-118</td>
                  <td className="py-2 text-slate-800">Structural Work</td>
                  <td className="py-2 text-slate-500">08 Sep 2025</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ============================================================
          ROW 3: Gantt Chart + Recent Activity + Quick Actions (Matches Image 1)
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Card 1: Gantt Chart Timeline (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-bold text-[#0B192C]">Gantt Chart</h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0062FF]"></span> Planned</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Actual</span>
              </div>
            </div>
            <Link to="/schedule" className="text-xs font-semibold text-[#0062FF] hover:underline">
              View Full Gantt
            </Link>
          </div>

          {/* Gantt Timeline Mockup (Matches visual bars in Image 1) */}
          <div className="overflow-x-auto">
            <div className="min-w-[420px]">
              {/* Timeline Header */}
              <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 border-b border-slate-100 pb-2">
                <div className="col-span-2">ID</div>
                <div className="col-span-4">Activity</div>
                <div className="col-span-6 grid grid-cols-5 text-center">
                  <span>Sep 1</span>
                  <span>Sep 5</span>
                  <span>Sep 10</span>
                  <span>Sep 15</span>
                  <span>Sep 20</span>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-3 pt-3 text-xs">
                {/* Row 1: P-101 */}
                <div className="grid grid-cols-12 items-center">
                  <span className="col-span-2 font-mono text-slate-600">P-101</span>
                  <span className="col-span-4 text-slate-800 font-medium truncate pr-2">Pump Installation</span>
                  <div className="col-span-6 relative h-5 bg-slate-50 rounded">
                    <div className="absolute top-1 left-[5%] w-[35%] h-3 bg-[#0062FF] rounded-full"></div>
                    <div className="absolute top-1 left-[15%] w-[20%] h-3 bg-emerald-500 rounded-full opacity-80"></div>
                  </div>
                </div>

                {/* Row 2: G-102 */}
                <div className="grid grid-cols-12 items-center">
                  <span className="col-span-2 font-mono text-slate-600">G-102</span>
                  <span className="col-span-4 text-slate-800 font-medium truncate pr-2">Cable Laying</span>
                  <div className="col-span-6 relative h-5 bg-slate-50 rounded">
                    <div className="absolute top-1 left-[20%] w-[35%] h-3 bg-[#0062FF]/60 rounded-full"></div>
                    <div className="absolute top-1 left-[25%] w-[30%] h-3 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                {/* Row 3: M-104 */}
                <div className="grid grid-cols-12 items-center">
                  <span className="col-span-2 font-mono text-slate-600">M-104</span>
                  <span className="col-span-4 text-slate-800 font-medium truncate pr-2">Motor Alignment</span>
                  <div className="col-span-6 relative h-5 bg-slate-50 rounded">
                    <div className="absolute top-1 left-[35%] w-[32%] h-3 bg-[#0062FF] rounded-full"></div>
                    <div className="absolute top-1 left-[40%] w-[22%] h-3 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                {/* Row 4: S-118 */}
                <div className="grid grid-cols-12 items-center">
                  <span className="col-span-2 font-mono text-slate-600">S-118</span>
                  <span className="col-span-4 text-slate-800 font-medium truncate pr-2">Structural Work</span>
                  <div className="col-span-6 relative h-5 bg-slate-50 rounded">
                    <div className="absolute top-1 left-[50%] w-[30%] h-3 bg-[#0062FF]/80 rounded-full"></div>
                  </div>
                </div>

                {/* Row 5: E-120 */}
                <div className="grid grid-cols-12 items-center">
                  <span className="col-span-2 font-mono text-slate-600">E-120</span>
                  <span className="col-span-4 text-slate-800 font-medium truncate pr-2">Electrical Testing</span>
                  <div className="col-span-6 relative h-5 bg-slate-50 rounded">
                    <div className="absolute top-1 left-[65%] w-[30%] h-3 bg-[#0062FF]/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Recent Activity Timeline (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-[#0B192C] mb-4">Recent Activity</h3>

          <div className="space-y-4">
            {/* 1. DPR Submitted */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0062FF] flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 leading-none">DPR Submitted</p>
                  <span className="text-[10px] text-slate-400">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Site Engineer uploaded DPR for Pump P-101
                </p>
              </div>
            </div>

            {/* 2. Activity Matched */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Cpu size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 leading-none">Activity Matched</p>
                  <span className="text-[10px] text-slate-400">3h ago</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  AI matched to "Pump Installation" (98% confidence)
                </p>
              </div>
            </div>

            {/* 3. Validation Completed */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 leading-none">Validation Completed</p>
                  <span className="text-[10px] text-slate-400">4h ago</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Planner approved the match
                </p>
              </div>
            </div>

            {/* 4. Progress Updated */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 leading-none">Progress Updated</p>
                  <span className="text-[10px] text-slate-400">5h ago</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Actual progress updated to 68%
                </p>
              </div>
            </div>

            {/* 5. Report Generated */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 leading-none">Report Generated</p>
                  <span className="text-[10px] text-slate-400">6h ago</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Weekly report is ready for download
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Quick Actions (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0B192C] mb-3">Quick Actions</h3>

          <div className="space-y-2.5">
            {/* Action 1: Upload DPR (Solid Blue) */}
            <Link
              to="/dpr"
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#0062FF] hover:bg-[#0051DC] text-white transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Plus size={18} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold leading-tight">Upload DPR</p>
                <p className="text-[10px] text-white/80 mt-0.5 truncate">Text, Voice, Excel, PDF, Photos</p>
              </div>
            </Link>

            {/* Action 2: Upload Schedule */}
            <Link
              to="/schedule"
              className="flex items-center gap-3 w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062FF] flex items-center justify-center shrink-0">
                <Upload size={16} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold leading-tight text-slate-900">Upload Schedule</p>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Excel / CSV / Primavera</p>
              </div>
            </Link>

            {/* Action 3: View Reports */}
            <Link
              to="/reports"
              className="flex items-center gap-3 w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062FF] flex items-center justify-center shrink-0">
                <BarChart2 size={16} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold leading-tight text-slate-900">View Reports</p>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Daily / Weekly / Export</p>
              </div>
            </Link>

            {/* Action 4: Manage Projects */}
            <Link
              to="/projects"
              className="flex items-center gap-3 w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-800 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062FF] flex items-center justify-center shrink-0">
                <Settings size={16} />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold leading-tight text-slate-900">Manage Projects</p>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Add / Edit / Archive</p>
              </div>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
