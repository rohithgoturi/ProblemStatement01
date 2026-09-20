const { SYSTEM_PROMPT, buildUserPrompt } = require('./extractionPrompt');

/**
 * Isolated LLM Client for PragatiPath.
 * Supports Google Gemini API (via @google/genai or REST) with deterministic fallback for local development.
 */
class LLMClient {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY || null;
    this.modelName = process.env.LLM_MODEL || 'gemini-2.5-flash';
  }

  /**
   * Calls LLM API to extract structured progress events from raw text.
   * Returns parsed JSON object.
   */
  async extractStructuredEvents(rawReportText) {
    if (!rawReportText || !rawReportText.trim()) {
      throw new Error('Raw report text cannot be empty for LLM extraction.');
    }

    if (this.apiKey) {
      try {
        console.log(`[LLMClient] Invoking Google Gemini API (${this.modelName})...`);
        const result = await this.callGeminiApi(rawReportText);
        return this.cleanAndParseJsonResponse(result);
      } catch (err) {
        console.warn(`[LLMClient] Gemini API call failed (${err.message}). Falling back to internal extraction engine.`);
        return this.ruleBasedFallbackExtraction(rawReportText);
      }
    } else {
      console.log('[LLMClient] No GEMINI_API_KEY set in environment. Using rule-based fallback extraction.');
      return this.ruleBasedFallbackExtraction(rawReportText);
    }
  }

  /**
   * Invokes Google Gemini REST API
   */
  async callGeminiApi(rawReportText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;
    const prompt = buildUserPrompt(rawReportText);

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        response_mime_type: 'application/json',
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response content received from Gemini API');
    }

    return candidateText;
  }

  /**
   * Strips markdown fences (```json) and parses JSON cleanly
   */
  cleanAndParseJsonResponse(text) {
    let clean = text.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      return JSON.parse(clean);
    } catch (parseErr) {
      throw new Error(`Failed to parse LLM response as valid JSON: ${parseErr.message}. Response was: "${text.substring(0, 100)}..."`);
    }
  }

  /**
   * Deterministic rule-based fallback extraction engine for local offline testing
   */
  ruleBasedFallbackExtraction(rawReportText) {
    const lines = rawReportText.split(/(?:\r?\n)+|(?<=\.)\s+/);
    const events = [];

    const disciplineKeywords = {
      Civil: ['civil', 'excavation', 'concrete', 'foundation', 'reinforcement', 'block a', 'rebar', 'soil'],
      Piping: ['piping', 'pipe', 'spool', 'hydrotest', 'flushing', 'yard b', 'header'],
      Electrical: ['electrical', 'cable', 'tray', 'substation', 'wiring'],
      Instrumentation: ['instrumentation', 'control room', 'panel', 'wiring', 'cni'],
      'Static Equipment': ['static', 'column', 'vessel', 'tank', 'exchanger'],
      'Rotating Equipment': ['rotating', 'pump', 'compressor', 'motor', 'turbine'],
      HSE: ['hse', 'safety', 'incident', 'permit'],
    };

    for (const line of lines) {
      const cleanLine = line.trim();
      if (cleanLine.length < 15) continue;

      let matchedDiscipline = 'General';
      const lowerLine = cleanLine.toLowerCase();

      for (const [disc, keywords] of Object.entries(disciplineKeywords)) {
        if (keywords.some((kw) => lowerLine.includes(kw))) {
          matchedDiscipline = disc;
          break;
        }
      }

      // Progress percentage check
      let pct = null;
      const pctMatch = cleanLine.match(/(\d{1,3})%/);
      if (pctMatch) {
        pct = parseInt(pctMatch[1], 10);
        if (pct > 100) pct = 100;
      } else if (lowerLine.includes('completed') || lowerLine.includes('finished')) {
        pct = 100;
      } else if (lowerLine.includes('started') || lowerLine.includes('in progress')) {
        pct = 50;
      }

      // Location check
      let loc = null;
      const locMatch = cleanLine.match(/(?:at|in|location:?)\s+([A-Za-z0-9\s]+?)(?=\s+(?:started|completed|is|was|\.|$))/i);
      if (locMatch) {
        loc = locMatch[1].trim();
      }

      // Date check (YYYY-MM-DD)
      let startDate = null;
      let finishDate = null;
      const dateMatches = cleanLine.match(/\b\d{4}-\d{2}-\d{2}\b/g);
      if (dateMatches && dateMatches.length > 0) {
        startDate = dateMatches[0];
        if (dateMatches.length > 1) {
          finishDate = dateMatches[1];
        }
      }

      // Clean activity name
      let actName = cleanLine;
      if (actName.length > 80) {
        actName = actName.substring(0, 80) + '...';
      }

      events.push({
        extractedActivityName: actName,
        discipline: matchedDiscipline,
        location: loc,
        reportedStartDate: startDate,
        reportedFinishDate: finishDate,
        reportedProgressPercentage: pct,
        evidenceText: cleanLine,
        uncertainties: pct === null ? ['Progress percentage not explicitly specified'] : [],
      });
    }

    if (events.length === 0) {
      events.push({
        extractedActivityName: rawReportText.substring(0, 80),
        discipline: 'General',
        location: null,
        reportedStartDate: null,
        reportedFinishDate: null,
        reportedProgressPercentage: null,
        evidenceText: rawReportText,
        uncertainties: ['Unstructured report without explicit milestones'],
      });
    }

    return { events };
  }
}

module.exports = new LLMClient();
