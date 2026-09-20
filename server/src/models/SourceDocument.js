const mongoose = require('mongoose');

const SOURCE_TYPE_ENUM = ['DPR_TEXT', 'SPREADSHEET', 'FILE_UPLOAD'];
const STATUS_ENUM = ['RECEIVED', 'PARSED', 'PROCESSING', 'FAILED'];

const sourceDocumentSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, 'Project ID is required'],
      index: true,
      default: 'default-project',
    },
    originalFileName: {
      type: String,
      required: [true, 'Original file name or identifier is required'],
      trim: true,
    },
    mimeType: {
      type: String,
      default: 'text/plain',
    },
    sourceType: {
      type: String,
      required: [true, 'Source type is required'],
      enum: {
        values: SOURCE_TYPE_ENUM,
        message: '{VALUE} is not a valid source type',
      },
    },
    rawContent: {
      type: String,
      required: [true, 'Raw content is required for complete auditability'],
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: 'RECEIVED',
    },
  },
  {
    timestamps: true,
  }
);

sourceDocumentSchema.index({ projectId: 1, createdAt: -1 });

module.exports = mongoose.model('SourceDocument', sourceDocumentSchema);
module.exports.SOURCE_TYPE_ENUM = SOURCE_TYPE_ENUM;
module.exports.STATUS_ENUM = STATUS_ENUM;
