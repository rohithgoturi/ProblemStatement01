const XLSX = require('xlsx');

const DISCIPLINE_MAP = {
  civil: 'Civil',
  piping: 'Piping',
  pipe: 'Piping',
  'static equipment': 'Static Equipment',
  static: 'Static Equipment',
  'rotating equipment': 'Rotating Equipment',
  rotating: 'Rotating Equipment',
  electrical: 'Electrical',
  elec: 'Electrical',
  instrumentation: 'Instrumentation',
  inst: 'Instrumentation',
  cni: 'Instrumentation',
  hse: 'HSE',
  safety: 'HSE',
  general: 'General',
};

/**
 * Maps raw object keys (flexible casing / header names) to standardized schema keys
 */
const standardizeRowKeys = (row) => {
  const normalized = {};

  for (const [key, value] of Object.entries(row)) {
    const cleanKey = key.toString().trim().toLowerCase().replace(/[\s_\-\.]+/g, '');

    if (['activityid', 'actid', 'id', 'code'].includes(cleanKey)) {
      normalized.activityId = value;
    } else if (['activityname', 'actname', 'name', 'title', 'description', 'activity'].includes(cleanKey)) {
      normalized.activityName = value;
    } else if (['wbscode', 'wbs', 'wbselement'].includes(cleanKey)) {
      normalized.wbsCode = value;
    } else if (['parentactivityid', 'parentid', 'parent'].includes(cleanKey)) {
      normalized.parentActivityId = value;
    } else if (['hierarchylevel', 'level', 'l1l6'].includes(cleanKey)) {
      normalized.hierarchyLevel = value;
    } else if (['discipline', 'dept', 'department', 'trade'].includes(cleanKey)) {
      normalized.discipline = value;
    } else if (['location', 'area', 'zone', 'block'].includes(cleanKey)) {
      normalized.location = value;
    } else if (['plannedstartdate', 'plannedstart', 'startdate', 'start'].includes(cleanKey)) {
      normalized.plannedStartDate = value;
    } else if (['plannedfinishdate', 'plannedfinish', 'finishdate', 'finish', 'enddate', 'end'].includes(cleanKey)) {
      normalized.plannedFinishDate = value;
    } else if (['progresspercentage', 'progress', 'percentage', 'pctcomplete'].includes(cleanKey)) {
      normalized.progressPercentage = value;
    } else if (['status'].includes(cleanKey)) {
      normalized.status = value;
    } else {
      // Store non-standard fields as metadata
      if (!normalized.metadata) normalized.metadata = {};
      normalized.metadata[key] = value !== undefined && value !== null ? value.toString() : '';
    }
  }

  return normalized;
};

/**
 * Safely parses dates from strings, numbers (Excel timestamp), or Date objects.
 */
const parseDate = (val) => {
  if (!val) return null;
  if (val instanceof Date && !isNaN(val)) return val;

  if (typeof val === 'number') {
    // Excel date epoch offset calculation
    const parsed = new Date(Math.round((val - 25569) * 86400 * 1000));
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return null;

    // Direct ISO or standard date parsing
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) return date;

    // Handle DD/MM/YYYY or DD-MM-YYYY format
    const parts = trimmed.split(/[\/\-\.]/);
    if (parts.length === 3) {
      // If year is 4 digits at end (DD/MM/YYYY)
      if (parts[2].length === 4) {
        const d = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const y = parseInt(parts[2], 10);
        const altDate = new Date(y, m, d);
        if (!isNaN(altDate.getTime())) return altDate;
      }
    }
  }

  return null;
};

/**
 * Normalizes discipline string to standard enum
 */
const normalizeDiscipline = (val) => {
  if (!val) return 'General';
  const clean = val.toString().trim().toLowerCase();
  return DISCIPLINE_MAP[clean] || 'General';
};

/**
 * Parse CSV or XLSX buffer using xlsx library
 */
const parseSpreadsheetBuffer = (buffer, filename) => {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  return rawRows.map((row) => standardizeRowKeys(row));
};

/**
 * Parse JSON string or array
 */
const parseJsonContent = (content) => {
  const rawData = typeof content === 'string' ? JSON.parse(content) : content;
  const arrayData = Array.isArray(rawData) ? rawData : rawData.activities || [rawData];

  return arrayData.map((row) => standardizeRowKeys(row));
};

module.exports = {
  standardizeRowKeys,
  parseDate,
  normalizeDiscipline,
  parseSpreadsheetBuffer,
  parseJsonContent,
};
