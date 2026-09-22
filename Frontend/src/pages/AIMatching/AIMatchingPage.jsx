/**
 * PragatiPath — AI Matching & Planner Review Queue (Full Backend API Integrated)
 * All mock data removed. Human-in-the-loop planner approval connected to backend endpoints.
 */
import { useState, useEffect } from 'react';
import {
  MdAutoAwesome,
  MdCheckCircle,
  MdInfoOutline,
  MdClose,
  MdCheck,
  MdEdit,
  MdRefresh,
  MdWarning
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
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <MdCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="AI Matching & Planner Review Queue"
        subtitle="Human-in-the-loop review queue for AI suggested schedule matches"
        icon={<MdAutoAwesome />}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchPendingData}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              <MdRefresh size={16} className="inline mr-1" />
              Refresh Queue
            </button>
            <button
              type="button"
              onClick={handleBatchMatch}
              className="px-4 py-2 rounded-xl bg-[#0056D2] text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
            >
              <MdAutoAwesome size={16} className="inline mr-1" />
              Run AI Batch Matching
            </button>
          </div>
        }
      />

      {/* Human Oversight Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
        <MdWarning size={22} className="text-amber-600 shrink-0" />
        <div>
          <strong>Human Oversight Rule:</strong> AI suggestions never modify schedule actuals directly. Schedule start/finish dates and progress percentages are updated in MongoDB only when approved by a project planner.
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Pending Reviews Queue Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Pending Planner Review Items ({pendingReviews.length})
          </h2>
          <span className="text-xs text-slate-500">
            {pendingReviews.length === 0 ? 'Review queue empty' : 'Action required before schedule commit'}
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <span className="inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-2" />
            <p>Fetching pending review recommendations from backend...</p>
          </div>
        ) : pendingReviews.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 space-y-2">
            <MdCheckCircle size={36} className="mx-auto text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-700">All Pending Reviews Completed!</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
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
                <div key={eventId} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 transition-all shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {item.discipline || 'General Discipline'}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {item.extractedActivityName || item.rawActivityName || 'Reported Progress Event'}
                      </h3>
                    </div>

                    {/* Match Confidence Pill */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Confidence:</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                        confidence >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {confidence}% Match
                      </span>
                    </div>
                  </div>

                  {/* Matching Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Reported Event Data */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                      <div className="font-bold text-slate-700 uppercase text-[10px]">Extracted Site Report Data</div>
                      <div>Reported Start: <strong className="text-slate-800">{item.actualStartDate ? new Date(item.actualStartDate).toLocaleDateString() : 'N/A'}</strong></div>
                      <div>Reported Finish: <strong className="text-slate-800">{item.actualFinishDate ? new Date(item.actualFinishDate).toLocaleDateString() : 'N/A'}</strong></div>
                      <div>Progress: <strong className="text-slate-800">{item.progressPercentage || 100}%</strong></div>
                    </div>

                    {/* AI Suggested Schedule Activity */}
                    <div className="bg-blue-50/40 p-3 rounded-lg border border-blue-100 space-y-1">
                      <div className="font-bold text-blue-900 uppercase text-[10px]">Suggested Schedule Activity</div>
                      <div>Activity ID: <strong className="font-mono text-blue-700">{suggested?.activityId || 'Unlinked'}</strong></div>
                      <div>Name: <strong className="text-slate-900">{suggested?.activityName || 'No direct match found'}</strong></div>
                      <div className="text-[11px] text-slate-500 italic mt-1">{item.matchingReason || 'AI matched based on activity similarity & discipline'}</div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleReject(item)}
                      disabled={isProcessing}
                      className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MdClose size={15} className="inline mr-1" />
                      Reject Match
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      disabled={isProcessing}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MdEdit size={15} className="inline mr-1" />
                      Edit & Change Link
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApprove(item)}
                      disabled={isProcessing}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer disabled:opacity-50"
                    >
                      <MdCheck size={15} className="inline mr-1" />
                      {isProcessing ? 'Saving to Schedule...' : 'Approve & Commit Schedule'}
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit & Approve Schedule Link</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600">
                <MdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Schedule Activity</label>
                <select
                  value={editForm.selectedActivityId}
                  onChange={(e) => setEditForm({ ...editForm, selectedActivityId: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg font-mono text-xs focus:border-blue-600"
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
                  <label className="block font-bold text-slate-700 mb-1">Actual Start Date</label>
                  <input
                    type="date"
                    value={editForm.actualStartDate}
                    onChange={(e) => setEditForm({ ...editForm, actualStartDate: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Actual Finish Date</label>
                  <input
                    type="date"
                    value={editForm.actualFinishDate}
                    onChange={(e) => setEditForm({ ...editForm, actualFinishDate: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Progress Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.progressPercentage}
                  onChange={(e) => setEditForm({ ...editForm, progressPercentage: Number(e.target.value) })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Planner Review Notes</label>
                <input
                  type="text"
                  placeholder="Optional review explanation"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border rounded-lg font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
                >
                  Save & Update Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
