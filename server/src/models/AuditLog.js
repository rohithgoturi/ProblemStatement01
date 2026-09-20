const mongoose = require('mongoose');

const ENTITY_TYPE_ENUM = ['ProgressEvent', 'ScheduleActivity', 'MatchResult', 'ReviewDecision'];

const ACTION_ENUM = [
  'EXTRACTED',
  'MATCH_PROPOSED',
  'MATCH_UPDATED',
  'APPROVED',
  'REJECTED',
  'SCHEDULE_UPDATED',
  'MANUAL_EDIT',
];

const auditLogSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      default: 'default-project',
      index: true,
    },
    entityType: {
      type: String,
      required: [true, 'Entity type is required'],
      enum: ENTITY_TYPE_ENUM,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Entity ID reference is required'],
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      enum: ACTION_ENUM,
    },
    previousValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    newValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    actor: {
      type: String,
      required: [true, 'Actor is required'],
      default: 'SYSTEM',
    },
    sourceReference: {
      type: String,
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false, // Explicit timestamp field used
  }
);

auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
module.exports.ENTITY_TYPE_ENUM = ENTITY_TYPE_ENUM;
module.exports.ACTION_ENUM = ACTION_ENUM;
