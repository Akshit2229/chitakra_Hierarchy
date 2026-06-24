/**
 * Builds the adjacency list and applies the Multiple Parent Rule.
 * If a child node already has a parent node assigned by a previous edge,
 * subsequent edges pointing to that child node are ignored.
 * 
 * @param {String[]} uniqueEdges - Array of unique edge strings
 * @returns {Object} Graph data structure:
 * - adj: Adjacency list of final graph
 * - parentMap: Map of child -> parent
 * - activeEdges: Edges included in the graph
 * - ignoredMultipleParents: Edges ignored due to multiple parent rule
 * - allNodes: Array of all nodes present in the final graph
 */
function buildGraph(uniqueEdges) {
  const adj = {};
  const parentMap = {}; // child -> parent
  const activeEdges = [];
  const ignoredMultipleParents = [];
  const allNodes = new Set();

  for (const edge of uniqueEdges) {
    const [u, v] = edge.split("->");
    
    // Track all nodes
    allNodes.add(u);
    allNodes.add(v);

    if (parentMap[v]) {
      // Child already has a parent from a prior edge. Ignore this edge.
      ignoredMultipleParents.push(edge);
      continue;
    }

    parentMap[v] = u;
    activeEdges.push(edge);
  }

  // Initialize adjacency list for all active/referenced nodes
  for (const node of allNodes) {
    adj[node] = [];
  }

  // Populate adjacency list
  for (const edge of activeEdges) {
    const [u, v] = edge.split("->");
    adj[u].push(v);
  }

  // Sort children lexicographically for clean consistency
  for (const node in adj) {
    adj[node].sort();
  }

  return {
    adj,
    parentMap,
    activeEdges,
    ignoredMultipleParents,
    allNodes: Array.from(allNodes)
  };
}

module.exports = { buildGraph };
