const { VALID_EDGE_REGEX } = require('../utils/constants');

/**
 * Validates individual edge strings.
 * Rules:
 * - Format: X->Y (single uppercase letters)
 * - No self loops (X === Y is invalid)
 * - Trim whitespace (e.g. " A->B " -> "A->B" is valid)
 * - Empty strings/null/undefined are invalid
 * 
 * @param {Array} data - Input array from request body
 * @returns {Object} { validEdges: String[], invalidEntries: String[] }
 */
function validateEdges(data) {
  const validEdges = [];
  const invalidEntries = [];

  if (!Array.isArray(data)) {
    return { validEdges, invalidEntries };
  }

  for (const entry of data) {
    if (entry === null || entry === undefined) {
      invalidEntries.push(String(entry));
      continue;
    }
    const str = String(entry);
    const trimmed = str.trim();
    if (trimmed === "") {
      invalidEntries.push(str);
      continue;
    }
    if (!VALID_EDGE_REGEX.test(trimmed)) {
      invalidEntries.push(str);
      continue;
    }
    const [source, target] = trimmed.split("->");
    if (source === target) {
      invalidEntries.push(str);
      continue;
    }
    validEdges.push(trimmed);
  }

  return { validEdges, invalidEntries };
}

module.exports = { validateEdges };
