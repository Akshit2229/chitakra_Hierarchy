const { USER_ID, EMAIL_ID, COLLEGE_ROLL_NUMBER } = require('../utils/constants');
const { validateEdges } = require('../services/validator');
const { detectDuplicates } = require('../services/duplicateService');
const { buildGraph } = require('../services/graphService');
const { analyzeComponents } = require('../services/cycleDetector');
const { buildTree } = require('../services/treeBuilder');
const { calculateDepth } = require('../services/depthCalculator');
const { generateSummary } = require('../services/summaryGenerator');

/**
 * Handles POST /bfhl requests.
 * Processes an array of string edges to analyze trees and cycles.
 */
function handleBfhlPost(req, res) {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request payload. 'data' must be an array of edge strings."
      });
    }

    // 1. Validation
    const { validEdges, invalidEntries } = validateEdges(data);

    // 2. Duplicate Detection
    const { uniqueEdges, duplicateEdges } = detectDuplicates(validEdges);

    // 3. Graph Construction & Multiple Parent Filtering
    const graphData = buildGraph(uniqueEdges);
    const { adj, activeEdges, ignoredMultipleParents } = graphData;

    // 4. Component / Cycle Analysis
    const components = analyzeComponents(graphData);

    // 5. Hierarchy Building (Tree structures and Depth calculation)
    const hierarchies = components.map(comp => {
      if (comp.has_cycle) {
        return {
          root: comp.root,
          tree: {},
          has_cycle: true
        };
      } else {
        const treeObj = buildTree(comp.root, adj);
        const depth = calculateDepth(comp.root, adj);
        return {
          root: comp.root,
          tree: treeObj,
          has_cycle: false,
          depth
        };
      }
    });

    // 6. Summary Generation
    const summary = generateSummary(components, adj);

    // 7. Send Response
    return res.json({
      user_id: USER_ID,
      email_id: EMAIL_ID,
      college_roll_number: COLLEGE_ROLL_NUMBER,
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary,
      // Extra details for premium frontend rendering
      ignored_multiple_parent_edges: ignoredMultipleParents,
      active_edges: activeEdges
    });

  } catch (error) {
    console.error("Error processing BFHL request:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while processing graph hierarchy data."
    });
  }
}

module.exports = { handleBfhlPost };
