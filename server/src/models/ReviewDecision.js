const mongoose = require('mongoose');

const DECISION_ENUM = ['APPROVED', 'EDITED_AND_APPROVED', 'REJECTED', 'NEEDS_CLARIFICATION'];

const reviewDecisionSchema = new mongoose.Schema(
  {
    progressEventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProgressEvent',
      required: [true, 'Progress Event ID reference is required'],
      index: true,
    },
    decision: {
      type: String,
      required: [true, 'Review decision is required'],
      enum: {
        values: DECISION_ENUM,
        message: '{VALUE} is not a valid review decision',
      },
    },
    selectedScheduleActivityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScheduleActivity',
      default: null,
    },
    reviewerId: {
      type: String,
      required: [true, 'Reviewer ID is required'],
      default: 'planner-1',
      trim: true,
    },
    reviewerNotes: {
      type: String,
      trim: true,
      default: '',
    },
    appliedChanges: {
      actualStartDate: { type: Date, default: null },
      actualFinishDate: { type: Date, default: null },
      progressPercentage: { type: Number, default: null },
    },
    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

reviewDecisionSchema.index({ reviewedAt: -1 });

module.exports = mongoose.model('ReviewDecision', reviewDecisionSchema);
module.exports.DECISION_ENUM = DECISION_ENUM;
