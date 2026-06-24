const request = require('supertest');
const app = require('../server');

describe('BFHL Graph Processing API', () => {

  test('Valid tree structure with duplicate edges and whitespace', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({
        data: [
          "A->B",
          "  A->C  ", // whitespace
          "B->D",
          "A->B" // duplicate
        ]
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('email_id');
    expect(response.body).toHaveProperty('college_roll_number');

    // Duplicate detection
    expect(response.body.duplicate_edges).toContain("A->B");
    
    // Check hierarchies
    expect(response.body.hierarchies.length).toBe(1);
    const hierarchy = response.body.hierarchies[0];
    expect(hierarchy.root).toBe("A");
    expect(hierarchy.has_cycle).toBe(false);
    expect(hierarchy.depth).toBe(3); // A -> B -> D is 3 nodes
    expect(hierarchy.tree).toEqual({
      "A": {
        "B": {
          "D": {}
        },
        "C": {}
      }
    });

    // Check summary
    expect(response.body.summary).toEqual({
      total_trees: 1,
      total_cycles: 0,
      largest_tree_root: "A"
    });
  });

  test('Invalid edge entries and self-loops', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({
        data: [
          "hello",      // completely invalid format
          "1->2",       // lowercase/numbers
          "AB->C",      // multi-character
          "A-B",        // wrong separator
          "A->",        // missing child
          "A->A",       // self-loop
          ""            // empty string
        ]
      });

    expect(response.status).toBe(200);
    expect(response.body.invalid_entries).toEqual([
      "hello",
      "1->2",
      "AB->C",
      "A-B",
      "A->",
      "A->A",
      ""
    ]);
    expect(response.body.hierarchies.length).toBe(0);
    expect(response.body.summary).toEqual({
      total_trees: 0,
      total_cycles: 0,
      largest_tree_root: null
    });
  });

  test('Multiple Parent Rule', async () => {
    // A->D and B->D. A->D is first, so keep A->D and ignore B->D.
    const response = await request(app)
      .post('/bfhl')
      .send({
        data: [
          "A->D",
          "B->D"
        ]
      });

    expect(response.status).toBe(200);
    
    // In final graph, B->D is ignored, so B is an isolated node.
    // Component 1: A->D (root A)
    // Component 2: B (root B)
    // total trees: 2
    expect(response.body.summary).toEqual({
      total_trees: 2,
      total_cycles: 0,
      largest_tree_root: "A" // A->D size is 2, B size is 1
    });

    expect(response.body.ignored_multiple_parent_edges).toContain("B->D");
  });

  test('Cycle Detection - Pure Cycle', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({
        data: [
          "X->Y",
          "Y->Z",
          "Z->X"
        ]
      });

    expect(response.status).toBe(200);
    expect(response.body.hierarchies.length).toBe(1);
    
    const hierarchy = response.body.hierarchies[0];
    expect(hierarchy.root).toBe("X"); // Lexicographically smallest
    expect(hierarchy.has_cycle).toBe(true);
    expect(hierarchy.tree).toEqual({});
    expect(hierarchy).not.toHaveProperty('depth'); // Depth omitted for cycles

    expect(response.body.summary).toEqual({
      total_trees: 0,
      total_cycles: 1,
      largest_tree_root: null
    });
  });

  test('Validation of Request Payload', async () => {
    const response = await request(app)
      .post('/bfhl')
      .send({
        wrong_key: []
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
