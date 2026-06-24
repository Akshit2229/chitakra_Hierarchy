/**
 * Helper to recursively count the total nodes in a tree starting from root.
 * 
 * @param {String} node - Current node
 * @param {Object} adj - Adjacency list of the graph
 * @returns {Number} Total nodes in the tree
 */
function countNodes(node, adj) {
  const children = adj[node] || [];
  let count = 1;
  for (const child of children) {
    count += countNodes(child, adj);
  }
  return count;
}

/**
 * Generates the summary object from hierarchies and the graph adjacency list.
 * Fields:
 * - total_trees: count of trees (has_cycle = false)
 * - total_cycles: count of cycles (has_cycle = true)
 * - largest_tree_root: root of tree with max node count (tiebreaker: lexicographically smallest root)
 * 
 * @param {Object[]} hierarchies - List of component objects
 * @param {Object} adj - Adjacency list of the graph
 * @returns {Object} Summary stats
 */
function generateSummary(hierarchies, adj) {
  let total_trees = 0;
  let total_cycles = 0;
  let largestTreeRoot = null;
  let largestTreeSize = -1;

  for (const h of hierarchies) {
    if (h.has_cycle) {
      total_cycles++;
    } else {
      total_trees++;
      const treeSize = countNodes(h.root, adj);
      if (treeSize > largestTreeSize) {
        largestTreeSize = treeSize;
        largestTreeRoot = h.root;
      } else if (treeSize === largestTreeSize) {
        // Tiebreaker: Lexicographically smallest root
        if (largestTreeRoot === null || h.root.localeCompare(largestTreeRoot) < 0) {
          largestTreeRoot = h.root;
        }
      }
    }
  }

  return {
    total_trees,
    total_cycles,
    largest_tree_root: largestTreeRoot
  };
}

module.exports = { generateSummary };
