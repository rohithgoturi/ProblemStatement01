const mongoose = require('mongoose');

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

const STATUS_ENUM = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'DELAYED'];

const scheduleActivitySchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, 'Project ID is required'],
      index: true,
      default: 'default-project',
    },
    activityId: {
      type: String,
      required: [true, 'Schedule Activity ID is required'],
      trim: true,
    },
    activityName: {
      type: String,
      required: [true, 'Activity name is required'],
      trim: true,
    },
    wbsCode: {
      type: String,
      trim: true,
      default: null,
    },
    parentActivityId: {
      type: String,
      trim: true,
      default: null,
    },
    hierarchyLevel: {
      type: Number,
      min: [1, 'Hierarchy level must be between 1 and 6'],
      max: [6, 'Hierarchy level must be between 1 and 6'],
      default: 5,
    },
    discipline: {
      type: String,
      required: [true, 'Discipline is required'],
      enum: {
        values: DISCIPLINE_ENUM,
        message: '{VALUE} is not a supported engineering discipline',
      },
      trim: true,
      default: 'General',
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    plannedStartDate: {
      type: Date,
      default: null,
    },
    plannedFinishDate: {
      type: Date,
      default: null,
    },
    actualStartDate: {
      type: Date,
      default: null,
    },
    actualFinishDate: {
      type: Date,
      default: null,
    },
    progressPercentage: {
      type: Number,
      min: [0, 'Progress percentage cannot be less than 0'],
      max: [100, 'Progress percentage cannot exceed 100'],
      default: 0,
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: 'PLANNED',
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index on projectId + activityId
scheduleActivitySchema.index({ projectId: 1, activityId: 1 }, { unique: true });

// Index for search & matching lookups
scheduleActivitySchema.index({ projectId: 1, discipline: 1 });
scheduleActivitySchema.index({ activityName: 'text' });

module.exports = mongoose.model('ScheduleActivity', scheduleActivitySchema);
module.exports.DISCIPLINE_ENUM = DISCIPLINE_ENUM;
module.exports.STATUS_ENUM = STATUS_ENUM;
