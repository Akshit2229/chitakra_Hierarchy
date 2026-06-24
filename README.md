# Chitkara Full Stack Engineering Challenge - Hierarchy & Cycle Analyzer

A production-ready full-stack application built to parse, validate, and analyze hierarchical parent-child graph connections. This tool handles duplicate detection, validates structure, applies single-parent filtering rules, and detects circular dependencies. It generates beautiful, interactive collapsible trees, loops visualizations, and detailed KPI reports.

---

## 🚀 Tech Stack

### Backend
* **Node.js & Express.js** - Robust, modular REST API server.
* **Jest & Supertest** - Complete automated integration test suite.
* **CORS & Dotenv** - Configuration and cross-origin resource sharing management.

### Frontend
* **React (Vite)** - Ultra-fast, single-page application foundation.
* **Tailwind CSS** - Modern utility-first CSS framework for visual design.
* **Axios** - Network client for backend communication.
* **Lucide React** - High-fidelity icons for premium visual badges.

---

## 🛠️ Project Structure

```bash
chitkara-fullstack-challenge/
├── backend/
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   ├── server.js                  # Express Entrypoint
│   ├── routes/
│   │     └── bfhlRoutes.js        # Route declaration
│   ├── controllers/
│   │     └── bfhlController.js    # Payload marshalling
│   ├── services/
│   │     ├── validator.js         # Single edge validator
│   │     ├── duplicateService.js  # Edge deduplicator
│   │     ├── graphService.js      # Graph builder & single-parent rule
│   │     ├── cycleDetector.js     # Component analysis & cycles
│   │     ├── treeBuilder.js       # Nested tree construction
│   │     ├── depthCalculator.js   # Tree depth finder
│   │     └── summaryGenerator.js  # Summary KPIs
│   └── tests/
│         └── bfhl.test.js         # Jest integration test cases
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── .env
│   └── src/
│        ├── main.jsx
│        ├── App.jsx
│        ├── components/
│        │      ├── InputBox.jsx
│        │      ├── SubmitButton.jsx
│        │      ├── TreeView.jsx
│        │      ├── SummaryCard.jsx
│        │      ├── InvalidEntries.jsx
│        │      ├── DuplicateEdges.jsx
│        │      └── LoadingSpinner.jsx
│        ├── services/
│        │      └── api.js
│        ├── pages/
│        │      └── Home.jsx
│        └── styles/
│               └── globals.css
└── README.md
```

---

## ⚙️ How It Works (Processing Rules)

1. **Validation**: Edge strings must match `X->Y` (where `X` and `Y` are single uppercase alphabetical letters). Self-loops (`A->A`) are flagged as invalid. Empty lines are ignored, and whitespace is auto-trimmed. All malformed strings are returned under `invalid_entries`.
2. **Duplicate Detection**: Repeating edges (e.g. `A->B`, `A->B`) are deduplicated. Only the first occurrence is kept, and the string is logged under `duplicate_edges`.
3. **Multiple Parent Rule**: If a child node has multiple parents (e.g. `A->D` and `B->D`), only the first edge processed is kept. Subsequent edges defining a different parent are discarded and not added to the graph.
4. **Cycle Detection**: Connected components are grouped. If a component has no root (no node has an in-degree of 0), it contains a cycle loop. The root of the cycle is selected as the lexicographically smallest node in the loop. The tree structure is set to `{}` and depth is omitted.
5. **Tree Builder & Depth**: For valid tree components, a recursively built nested JSON structure is returned, along with the depth representing the number of nodes in the longest root-to-leaf path.

---

## 📡 API Specification

### POST `/bfhl`

#### Request Payload
```json
{
  "data": [
    "A->B",
    "A->C",
    "B->D",
    "A->B",
    "hello",
    "A->A"
  ]
}
```

#### Response Payload (Status 200)
```json
{
  "user_id": "anil_pathania_24062026",
  "email_id": "anil.pathania.college@gmail.com",
  "college_roll_number": "2110990000",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": {
            "D": {}
          },
          "C": {}
        }
      },
      "has_cycle": false,
      "depth": 3
    }
  ],
  "invalid_entries": [
    "hello",
    "A->A"
  ],
  "duplicate_edges": [
    "A->B"
  ],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  },
  "ignored_multiple_parent_edges": [],
  "active_edges": [
    "A->B",
    "A->C",
    "B->D"
  ]
}
```

---

## 🚀 Running Locally

### 1. Run the Backend
```bash
cd backend
npm install
npm start
```
By default, the backend runs on `http://localhost:5001`.

To run backend tests:
```bash
npm run test
```

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
By default, the Vite dev server runs on `http://localhost:3000`.

---

## 🌐 Production Deployment Instructions

### Backend (Render)
1. Sign in to [Render](https://render.com/).
2. Create a new **Web Service** linked to your repository.
3. Configure the following settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Set Environment Variables:
   - `PORT=5001`
   - `USER_ID=your_custom_id`
   - `EMAIL_ID=your_college_email`
   - `COLLEGE_ROLL_NUMBER=your_roll_number`

### Frontend (Vercel)
1. Sign in to [Vercel](https://vercel.com/).
2. Import your project repository.
3. Configure the following settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. Add Environment Variable:
   - `VITE_API_URL=https://your-backend-app.onrender.com`
5. Click **Deploy**.
# chitakra_Hierarchy
