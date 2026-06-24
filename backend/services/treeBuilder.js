/**
 * Converts a graph component into a nested JSON object starting from the root.
 * Example return for root A with edges A->B, A->C, B->D:
 * {
 *   "A": {
 *     "B": {
 *       "D": {}
 *     },
 *     "C": {}
 *   }
 * }
 * 
 * @param {String} root - The root node of the tree
 * @param {Object} adj - Adjacency list of the graph
 * @returns {Object} Nested JSON representing the tree
 */
function buildTree(root, adj) {
  function getSubtree(node) {
    const subtree = {};
    const children = adj[node] || [];
    for (const child of children) {
      subtree[child] = getSubtree(child);
    }
    return subtree;
  }

  return {
    [root]: getSubtree(root)
  };
}

module.exports = { buildTree };
