const mongoose = require('mongoose');

const SOURCE_TYPE_ENUM = ['DPR_TEXT', 'SPREADSHEET', 'CONVERSATIONAL', 'PDF_OCR'];

const EVENT_STATUS_ENUM = [
  'EXTRACTED',
  'MATCH_SUGGESTED',
  'UNMATCHED',
  'PENDING_REVIEW',
  'NEEDS_CLARIFICATION',
  'APPROVED',
  'REJECTED',
];

const DISCIPLINE_ENUM = [
  'Civil',
  'Piping',
  'Static Equipment',
  'Rotating Equipment',
  'Electrical',
  'Instrumentation',
  'HSE',
  'General',
];

const progressEventSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, 'Project ID is required'],
      index: true,
      default: 'default-project',
    },
    sourceDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SourceDocument',
      default: null,
      index: true,
    },
    sourceFile: {
      type: String,
      required: [true, 'Source document or file identifier is required'],
      trim: true,
    },
    sourceType: {
      type: String,
      required: [true, 'Source type is required'],
      enum: {
        values: SOURCE_TYPE_ENUM,
        message: '{VALUE} is not a valid source type',
      },
    },
    rawText: {
      type: String,
      required: [true, 'Raw text input is required for auditability'],
      trim: true,
    },
    extractedActivityName: {
      type: String,
      required: [true, 'Extracted activity name is required'],
      trim: true,
    },
    discipline: {
      type: String,
      enum: DISCIPLINE_ENUM,
      default: 'General',
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    reportedStartDate: {
      type: Date,
      default: null,
    },
    reportedFinishDate: {
      type: Date,
      default: null,
    },
    reportedProgressPercentage: {
      type: Number,
      min: [0, 'Progress percentage cannot be less than 0'],
      max: [100, 'Progress percentage cannot exceed 100'],
      default: null,
    },
    extractionConfidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
    uncertainties: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: EVENT_STATUS_ENUM,
      default: 'EXTRACTED',
      index: true,
    },
    matchedActivityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScheduleActivity',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

progressEventSchema.index({ projectId: 1, status: 1 });
progressEventSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ProgressEvent', progressEventSchema);
module.exports.SOURCE_TYPE_ENUM = SOURCE_TYPE_ENUM;
module.exports.EVENT_STATUS_ENUM = EVENT_STATUS_ENUM;
