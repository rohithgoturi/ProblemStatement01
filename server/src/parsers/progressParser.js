const XLSX = require('xlsx');
const { parseDate, normalizeDiscipline } = require('./scheduleParser');

/**
 * Standardize discipline spreadsheet keys
 */
const standardizeProgressRowKeys = (row) => {
  const normalized = {};

  for (const [key, value] of Object.entries(row)) {
    const cleanKey = key.toString().trim().toLowerCase().replace(/[\s_\-\.]+/g, '');

    if (['activity', 'activityname', 'actname', 'description', 'task', 'workdone'].includes(cleanKey)) {
      normalized.extractedActivityName = value;
    } else if (['discipline', 'trade', 'dept', 'department'].includes(cleanKey)) {
      normalized.discipline = value;
    } else if (['location', 'area', 'zone', 'block'].includes(cleanKey)) {
      normalized.location = value;
    } else if (['startdate', 'start', 'actualstart', 'reportedstart'].includes(cleanKey)) {
      normalized.reportedStartDate = value;
    } else if (['finishdate', 'finish', 'enddate', 'actualfinish', 'reportedfinish'].includes(cleanKey)) {
      normalized.reportedFinishDate = value;
    } else if (['progress', 'progresspercentage', 'pct', 'completion', 'pctcomplete'].includes(cleanKey)) {
      normalized.reportedProgressPercentage = value;
    } else if (['rawtext', 'notes', 'remarks', 'evidence'].includes(cleanKey)) {
      normalized.rawText = value;
    }
  }

  return normalized;
};

/**
 * Parse spreadsheet buffer (CSV or XLSX) containing progress updates
 */
const parseProgressSpreadsheetBuffer = (buffer, filename) => {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  return rawRows.map((row) => {
    const std = standardizeProgressRowKeys(row);

    // Build raw text snippet if not explicitly provided
    const rawTextSnippet = std.rawText
      ? std.rawText.toString().trim()
      : Object.entries(row)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');

    let pct = parseFloat(std.reportedProgressPercentage);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      pct = null;
    }

    return {
      extractedActivityName: std.extractedActivityName ? std.extractedActivityName.toString().trim() : '',
      discipline: normalizeDiscipline(std.discipline),
      location: std.location ? std.location.toString().trim() : null,
      reportedStartDate: parseDate(std.reportedStartDate),
      reportedFinishDate: parseDate(std.reportedFinishDate),
      reportedProgressPercentage: pct,
      rawText: rawTextSnippet,
    };
  });
};

module.exports = {
  standardizeProgressRowKeys,
  parseProgressSpreadsheetBuffer,
};
