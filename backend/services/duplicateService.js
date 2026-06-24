/**
 * Deduplicates validated edges, retaining the first occurrence.
 * Captures duplicate edge strings in duplicateEdges (each duplicate string listed once).
 * 
 * @param {String[]} validEdges - Array of validated edge strings
 * @returns {Object} { uniqueEdges: String[], duplicateEdges: String[] }
 */
function detectDuplicates(validEdges) {
  const seen = new Set();
  const duplicateSet = new Set();
  const uniqueEdges = [];

  for (const edge of validEdges) {
    if (seen.has(edge)) {
      duplicateSet.add(edge);
    } else {
      seen.add(edge);
      uniqueEdges.push(edge);
    }
  }

  return {
    uniqueEdges,
    duplicateEdges: Array.from(duplicateSet)
  };
}

module.exports = { detectDuplicates };
