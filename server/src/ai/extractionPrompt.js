/**
 * System prompt and user prompt builder for structured progress extraction
 */

const SYSTEM_PROMPT = `You are an expert infrastructure project management AI assistant for PragatiPath.
Your task is to analyze Daily Progress Reports (DPRs), site diaries, and field updates, and extract distinct progress events into a structured JSON payload.

CRITICAL RULES:
1. DO NOT FABRICATE OR INVENT DATES, PROGRESS PERCENTAGES, OR ACTIVITY DETAILS.
2. If a start date or finish date is not explicitly mentioned in the report, return null.
3. If a progress percentage is not explicitly stated (or clearly inferrable like "completed" = 100%), return null.
4. Classify discipline into one of: ["Civil", "Piping", "Static Equipment", "Rotating Equipment", "Electrical", "Instrumentation", "HSE", "General"].
5. Extract exact sentence snippets as evidenceText for auditability.
6. Flag any ambiguities, unclear dates, or missing details in the "uncertainties" array.
7. Return ONLY valid JSON matching the specified JSON schema. Do not include markdown codeblocks or conversational text outside JSON.`;

const buildUserPrompt = (rawReportText) => {
  return `Analyze the following site progress report and extract structured progress events:

--- START REPORT ---
${rawReportText}
--- END REPORT ---

Respond with JSON in the exact format:
{
  "events": [
    {
      "extractedActivityName": "Foundation Excavation - Block A",
      "discipline": "Civil",
      "location": "Block A",
      "reportedStartDate": "2026-10-01",
      "reportedFinishDate": "2026-10-02",
      "reportedProgressPercentage": 100,
      "evidenceText": "Excavation for foundation at Block A reached 100% completion today morning.",
      "uncertainties": []
    }
  ]
}`;
};

module.exports = {
  SYSTEM_PROMPT,
  buildUserPrompt,
};
