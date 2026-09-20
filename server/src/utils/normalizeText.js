/**
 * Text normalization and similarity helper functions for schedule matching
 */

const ABBREVIATIONS = {
  fdn: 'foundation',
  found: 'foundation',
  exc: 'excavation',
  excav: 'excavation',
  reinf: 'reinforcement',
  conc: 'concreting',
  concrete: 'concreting',
  elec: 'electrical',
  inst: 'instrumentation',
  subst: 'substation',
  pip: 'piping',
  eqpt: 'equipment',
  align: 'alignment',
  hydro: 'hydrotesting',
};

/**
 * Normalizes text by lowercasing, stripping special characters, and expanding abbreviations
 */
const normalizeText = (str) => {
  if (!str) return '';
  const clean = str
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return clean
    .split(' ')
    .map((word) => ABBREVIATIONS[word] || word)
    .join(' ');
};

/**
 * Computes Jaccard / Token-Overlap Similarity between two text strings (0.0 to 1.0)
 */
const computeTextSimilarity = (str1, str2) => {
  const norm1 = normalizeText(str1);
  const norm2 = normalizeText(str2);

  if (!norm1 || !norm2) return 0;
  if (norm1 === norm2) return 1.0;

  const words1 = norm1.split(' ').filter((w) => w.length > 1);
  const words2 = norm2.split(' ').filter((w) => w.length > 1);

  if (words1.length === 0 || words2.length === 0) return 0;

  const set1 = new Set(words1);
  const set2 = new Set(words2);

  let intersectionCount = 0;
  set1.forEach((w) => {
    if (set2.has(w)) intersectionCount++;
  });

  const jaccard = intersectionCount / Math.max(set1.size, set2.size);

  // Substring inclusion bonus
  let bonus = 0;
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    bonus = 0.2;
  }

  return Math.min(1.0, Math.round((jaccard + bonus) * 100) / 100);
};

module.exports = {
  normalizeText,
  computeTextSimilarity,
  ABBREVIATIONS,
};
