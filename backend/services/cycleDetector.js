/**
 * Analyzes the graph to identify hierarchies (trees or cycles).
 * Treats the graph as undirected to partition nodes into connected components.
 * For each component:
 * - If there is a node with in-degree 0 (no incoming active edge), it is the root of a tree (no cycle).
 * - If there is no node with in-degree 0, it contains a cycle (has_cycle = true), and the "root" is the lexicographically smallest node.
 * 
 * @param {Object} graphData - Output from buildGraph (adj, parentMap, activeEdges, allNodes)
 * @returns {Object[]} Array of hierarchy components:
 * - root: String
 * - nodes: String[] (all nodes in this component)
 * - has_cycle: Boolean
 */
function analyzeComponents(graphData) {
  const { adj, parentMap, allNodes } = graphData;
  
  // 1. Build undirected adjacency list to find connected components
  const undirectedAdj = {};
  for (const node of allNodes) {
    undirectedAdj[node] = new Set();
  }
  
  for (const parent of allNodes) {
    const children = adj[parent] || [];
    for (const child of children) {
      undirectedAdj[parent].add(child);
      undirectedAdj[child].add(parent);
    }
  }

  // 2. Find connected components using BFS
  const visited = new Set();
  const components = [];

  for (const node of allNodes) {
    if (!visited.has(node)) {
      const componentNodes = [];
      const queue = [node];
      visited.add(node);

      while (queue.length > 0) {
        const curr = queue.shift();
        componentNodes.push(curr);

        for (const neighbor of undirectedAdj[curr]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      components.push(componentNodes);
    }
  }

  // 3. Analyze each component
  const hierarchies = [];

  for (const componentNodes of components) {
    // Find any node in this component with in-degree 0
    let rootNode = null;
    for (const n of componentNodes) {
      if (!parentMap[n]) {
        rootNode = n;
        break;
      }
    }

    if (rootNode) {
      // Component is a tree
      hierarchies.push({
        root: rootNode,
        nodes: componentNodes,
        has_cycle: false
      });
    } else {
      // No root exists -> Component has a cycle.
      // Choose lexicographically smallest node in the component as the root.
      const sortedNodes = [...componentNodes].sort();
      const chosenRoot = sortedNodes[0];

      hierarchies.push({
        root: chosenRoot,
        nodes: componentNodes,
        has_cycle: true
      });
    }
  }

  // Sort components so trees and cycles are returned in a predictable order
  // e.g., sort lexicographically by root name
  hierarchies.sort((a, b) => a.root.localeCompare(b.root));

  return hierarchies;
}

module.exports = { analyzeComponents };
