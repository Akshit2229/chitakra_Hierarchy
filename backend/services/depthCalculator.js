/**
 * Calculates the depth of a tree structure starting from the root node.
 * Depth is defined as the number of nodes in the longest root-to-leaf path.
 * E.g., A -> B -> C has depth 3.
 * 
 * @param {String} node - The node to calculate depth from
 * @param {Object} adj - Adjacency list of the graph
 * @returns {Number} Depth of the tree
 */
function calculateDepth(node, adj) {
  const children = adj[node] || [];
  if (children.length === 0) {
    return 1;
  }
  let maxChildDepth = 0;
  for (const child of children) {
    const childDepth = calculateDepth(child, adj);
    if (childDepth > maxChildDepth) {
      maxChildDepth = childDepth;
    }
  }
  return 1 + maxChildDepth;
}

module.exports = { calculateDepth };
