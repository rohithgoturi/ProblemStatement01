const { z } = require('zod');

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

const extractedEventItemSchema = z.object({
  extractedActivityName: z
    .string()
    .min(1, 'Activity description is required')
    .describe('Extracted activity name or work description'),
  discipline: z
    .enum(DISCIPLINE_ENUM)
    .default('General')
    .describe('Engineering discipline associated with the activity'),
  location: z
    .string()
    .nullable()
    .optional()
    .describe('Site location, area, zone, or block mentioned'),
  reportedStartDate: z
    .string()
    .nullable()
    .optional()
    .describe('Explicitly reported start date (YYYY-MM-DD) or null if unstated'),
  reportedFinishDate: z
    .string()
    .nullable()
    .optional()
    .describe('Explicitly reported finish/completion date (YYYY-MM-DD) or null if unstated'),
  reportedProgressPercentage: z
    .number()
    .min(0)
    .max(100)
    .nullable()
    .optional()
    .describe('Explicitly reported progress percentage (0-100) or null if unstated'),
  evidenceText: z
    .string()
    .min(1, 'Evidence text from raw input is required')
    .describe('Exact sentence or text snippet from the report that supports this event'),
  uncertainties: z
    .array(z.string())
    .default([])
    .describe('List of ambiguity notes or missing details flagged during extraction'),
});

const progressExtractionSchema = z.object({
  events: z.array(extractedEventItemSchema).default([]),
});

module.exports = {
  progressExtractionSchema,
  extractedEventItemSchema,
  DISCIPLINE_ENUM,
};
