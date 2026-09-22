/**
 * PragatiPath — AI Matching & Planner Review Queue (Full Backend API Integrated)
 * Clienter-inspired warm rounded cards, orange confidence highlights, and human oversight.
 * Connected directly to Express API & MongoDB aggregator.
 */
import { useState, useEffect } from 'react';
import {
  MdAutoAwesome,
  MdCheckCircle,
  MdClose,
  MdCheck,
  MdEdit,
  MdRefresh,
  MdWarning,
} from 'react-icons/md';
import { PageHeader } from '../../components/shared/PageHeader';
import {
  getPendingReviews,
  approveMatch,
  editAndApproveMatch,
  rejectMatch,
  batchMatchEvents,
  getScheduleActivities
} from '../../services/api';

export default function AIMatchingPage() {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [allScheduleActivities, setAllScheduleActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Edit modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    selectedActivityId: '',
    actualStartDate: '',
    actualFinishDate: '',
    progressPercentage: 100,
    notes: '',
  });

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch pending review items from backend
  const fetchPendingData = async () => {
    setLoading(true);
    setErrorMsg('');
    const [pendingRes, schedRes] = await Promise.all([
      getPendingReviews(),
      getScheduleActivities(),
    ]);

    if (pendingRes.error) {
      setErrorMsg(pendingRes.error);
    } else {
      setPendingReviews(pendingRes.data || []);
    }

    if (schedRes.data) {
      setAllScheduleActivities(schedRes.data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  // Trigger batch matching for unmatched extracted events
  const handleBatchMatch = async () => {
    setLoading(true);
    const res = await batchMatchEvents();
    if (res.error) {
      setErrorMsg(`Batch matching error: ${res.error}`);
    } else {
      showToast('AI Matching Engine processed extracted progress events!');
      fetchPendingData();
    }
  };

  // Approve candidate match
  const handleApprove = async (item) => {
    const eventId = item._id || item.id;
    setProcessingId(eventId);
    setErrorMsg('');

    const res = await approveMatch(eventId, {
      selectedActivityId: item.matchedScheduleActivity?.activityId || item.suggestedActivityId,
      actualStartDate: item.actualStartDate,
      actualFinishDate: item.actualFinishDate,
      progressPercentage: item.progressPercentage || 100,
    });

    setProcessingId(null);

    if (res.error) {
      setErrorMsg(`Approval failed: ${res.error}`);
    } else {
      showToast(`Approved match for "${item.extractedActivityName || item.rawActivityName}". Schedule updated!`);
      fetchPendingData();
    }
  };

  // Reject candidate match
  const handleReject = async (item) => {
    const eventId = item._id || item.id;
    setProcessingId(eventId);
    setErrorMsg('');

    const res = await rejectMatch(eventId, { notes: 'Rejected by planner review' });
    setProcessingId(null);

    if (res.error) {
      setErrorMsg(`Rejection failed: ${res.error}`);
    } else {
      showToast(`Rejected proposed match for "${item.extractedActivityName || item.rawActivityName}".`);
      fetchPendingData();
    }
  };

  // Open edit modal
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      selectedActivityId: item.matchedScheduleActivity?.activityId || item.suggestedActivityId || '',
      actualStartDate: item.actualStartDate ? new Date(item.actualStartDate).toISOString().split('T')[0] : '',
      actualFinishDate: item.actualFinishDate ? new Date(item.actualFinishDate).toISOString().split('T')[0] : '',
      progressPercentage: item.progressPercentage || 100,
      notes: '',
    });
  };

  // Submit edited match
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const eventId = editingItem._id || editingItem.id;
    setProcessingId(eventId);
    setErrorMsg('');

    const res = await editAndApproveMatch(eventId, editForm);
    setProcessingId(null);
    setEditingItem(null);

    if (res.error) {
      setErrorMsg(`Edit approval failed: ${res.error}`);
    } else {
      showToast('Match edited & approved! Schedule actuals updated successfully.');
      fetchPendingData();
    }
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B1320] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-base shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="AI Matching & Planner Review Queue"
        subtitle="Human-in-the-loop review interface: AI suggests, the planner decides."
        icon={<MdAutoAwesome />}
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchPendingData}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <MdRefresh size={16} className="inline" />
              <span>Refresh Queue</span>
            </button>
            <button
              type="button"
              onClick={handleBatchMatch}
              className="px-5 py-2 rounded-full bg-[#FF5500] hover:bg-[#EA580C] text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <MdAutoAwesome size={16} className="inline mr-1" />
              <span>Run AI Batch Match</span>
            </button>
          </div>
        }
      />

      {/* Human Oversight Principle Callout */}
      <div className="p-5 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-stone-700 flex items-start gap-3 shadow-2xs">
        <MdWarning size={22} className="text-[#FF5500] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#0B1320]">Human-in-the-Loop Governance:</strong> AI suggestions never modify schedule actuals directly. Schedule start/finish dates and progress percentages update in MongoDB only upon explicit approval from an authorized planner.
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          {errorMsg}
        </div>
      )}

      {/* Pending Reviews Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0B1320]">
            Pending Planner Review Items ({pendingReviews.length})
          </h2>
          <span className="text-xs text-stone-500">
            {pendingReviews.length === 0 ? 'Queue is clear' : 'Decision required before schedule commit'}
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-stone-400 text-xs font-medium">
            <span className="inline-block w-8 h-8 border-3 border-stone-200 border-t-[#FF5500] rounded-full animate-spin mb-3" />
            <p>Fetching pending review recommendations from backend...</p>
          </div>
        ) : pendingReviews.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF8F5] rounded-3xl border border-[#E8E1D5] p-8 space-y-3">
            <MdCheckCircle size={38} className="mx-auto text-emerald-600" />
            <h3 className="text-sm font-bold text-[#0B1320]">All Pending Reviews Completed!</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              There are no progress events awaiting planner review. Submit new DPR progress updates or run batch matching to process new items.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReviews.map((item) => {
              const eventId = item._id || item.id;
              const isProcessing = processingId === eventId;
              const suggested = item.matchedScheduleActivity || item.candidateMatches?.[0];
              const confidence = item.matchConfidence || item.confidence || 85;

              return (
                <div
                  key={eventId}
                  className="p-5 sm:p-6 rounded-3xl border border-[#E8E1D5] bg-[#FAF8F5]/40 hover:bg-white hover:border-[#FF5500]/40 transition-all shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#FF5500] bg-[#FF5500]/10 px-3 py-1 rounded-full border border-[#FF5500]/20">
                        {item.discipline || 'General Discipline'}
                      </span>
                      <h3 className="text-base font-bold text-[#0B1320] mt-2">
                        {item.extractedActivityName || item.rawActivityName || 'Reported Progress Event'}
                      </h3>
                    </div>

                    {/* Match Confidence Pill */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500 font-medium">Confidence:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          confidence >= 80
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {confidence}% Match
                      </span>
                    </div>
                  </div>

                  {/* Matching Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Reported Event Data */}
                    <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] space-y-1.5 shadow-2xs">
                      <div className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">
                        Extracted Site Report Data
                      </div>
                      <div className="text-stone-700">
                        Reported Start: <strong className="text-[#0B1320]">{item.actualStartDate ? new Date(item.actualStartDate).toLocaleDateString() : 'N/A'}</strong>
                      </div>
                      <div className="text-stone-700">
                        Reported Finish: <strong className="text-[#0B1320]">{item.actualFinishDate ? new Date(item.actualFinishDate).toLocaleDateString() : 'N/A'}</strong>
                      </div>
                      <div className="text-stone-700">
                        Progress: <strong className="text-[#FF5500]">{item.progressPercentage || 100}%</strong>
                      </div>
                    </div>

                    {/* AI Suggested Schedule Activity */}
                    <div className="bg-white p-4 rounded-2xl border border-[#FF5500]/30 space-y-1.5 shadow-2xs">
                      <div className="font-bold text-[#FF5500] uppercase text-[10px] tracking-wider">
                        Suggested Schedule Activity
                      </div>
                      <div className="text-stone-700">
                        Activity ID: <strong className="font-mono text-[#0B1320] font-bold">{suggested?.activityId || 'Unlinked'}</strong>
                      </div>
                      <div className="text-stone-700">
                        Name: <strong className="text-[#0B1320]">{suggested?.activityName || 'No direct match found'}</strong>
                      </div>
                      <div className="text-[11px] text-stone-500 italic mt-1">
                        {item.matchingReason || 'AI matched based on activity title similarity & discipline alignment.'}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handleReject(item)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MdClose size={15} className="inline mr-1" />
                      Reject Match
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-full border border-[#E8E1D5] bg-white hover:bg-[#FAF8F5] text-[#0B1320] font-bold text-xs transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                    >
                      <MdEdit size={15} className="inline mr-1 text-stone-500" />
                      Edit Link
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApprove(item)}
                      disabled={isProcessing}
                      className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MdCheck size={16} className="inline mr-1" />
                      {isProcessing ? 'Committing...' : 'Approve & Commit'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Match Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-[#0B1320]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 sm:p-8 shadow-2xl space-y-5 border border-[#E8E1D5]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-[#0B1320]">Edit & Approve Schedule Link</h3>
              <button onClick={() => setEditingItem(null)} className="text-stone-400 hover:text-stone-600">
                <MdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0B1320] mb-1.5">Target Schedule Activity</label>
                <select
                  value={editForm.selectedActivityId}
                  onChange={(e) => setEditForm({ ...editForm, selectedActivityId: e.target.value })}
                  className="w-full p-3 border border-[#E8E1D5] rounded-2xl font-mono text-xs focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10 bg-[#FAF8F5]"
                  required
                >
                  <option value="">Select Schedule Activity...</option>
                  {allScheduleActivities.map((act) => (
                    <option key={act._id} value={act.activityId}>
                      {act.activityId} — {act.activityName} ({act.discipline})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0B1320] mb-1.5">Actual Start Date</label>
                  <input
                    type="date"
                    value={editForm.actualStartDate}
                    onChange={(e) => setEditForm({ ...editForm, actualStartDate: e.target.value })}
                    className="w-full p-2.5 border border-[#E8E1D5] rounded-xl text-xs focus:outline-none focus:border-[#FF5500] bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B1320] mb-1.5">Actual Finish Date</label>
                  <input
                    type="date"
                    value={editForm.actualFinishDate}
                    onChange={(e) => setEditForm({ ...editForm, actualFinishDate: e.target.value })}
                    className="w-full p-2.5 border border-[#E8E1D5] rounded-xl text-xs focus:outline-none focus:border-[#FF5500] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B1320] mb-1.5">Progress Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.progressPercentage}
                  onChange={(e) => setEditForm({ ...editForm, progressPercentage: Number(e.target.value) })}
                  className="w-full p-2.5 border border-[#E8E1D5] rounded-xl text-xs focus:outline-none focus:border-[#FF5500] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B1320] mb-1.5">Planner Review Notes</label>
                <input
                  type="text"
                  placeholder="Optional justification or review notes"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full p-2.5 border border-[#E8E1D5] rounded-xl text-xs focus:outline-none focus:border-[#FF5500] bg-[#FAF8F5]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 border border-[#E8E1D5] rounded-full font-bold text-stone-600 hover:bg-[#FAF8F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 shadow-sm transition-colors"
                >
                  Save & Commit Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
