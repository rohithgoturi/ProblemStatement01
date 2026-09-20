const mongoose = require('mongoose');

const MATCH_STATUS_ENUM = ['PROPOSED', 'SELECTED_BY_PLANNER', 'REJECTED_BY_PLANNER', 'DISCARDED'];

const matchResultSchema = new mongoose.Schema(
  {
    progressEventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProgressEvent',
      required: [true, 'Progress Event ID reference is required'],
      index: true,
    },
    candidateActivityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScheduleActivity',
      required: [true, 'Candidate Schedule Activity ID reference is required'],
    },
    scheduleActivityIdStr: {
      type: String,
      required: [true, 'Schedule Activity string ID is required'],
      trim: true,
    },
    confidenceScore: {
      type: Number,
      required: [true, 'Confidence score is required'],
      min: [0, 'Confidence score cannot be less than 0'],
      max: [1, 'Confidence score cannot exceed 1'],
    },
    matchReason: {
      type: String,
      required: [true, 'Match reason is required'],
      trim: true,
    },
    matchingSignals: {
      textSimilarity: { type: Number, default: 0 },
      disciplineMatch: { type: Boolean, default: false },
      locationMatch: { type: Boolean, default: false },
      wbsMatch: { type: Boolean, default: false },
    },
    isTopRecommendation: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: MATCH_STATUS_ENUM,
      default: 'PROPOSED',
    },
  },
  {
    timestamps: true,
  }
);

matchResultSchema.index({ progressEventId: 1, confidenceScore: -1 });

module.exports = mongoose.model('MatchResult', matchResultSchema);
module.exports.MATCH_STATUS_ENUM = MATCH_STATUS_ENUM;
