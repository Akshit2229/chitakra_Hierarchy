require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bfhlRoutes = require('./routes/bfhlRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Endpoint (useful for Render deployments)
app.get('/', (req, res) => {
  res.json({
    status: "healthy",
    message: "Chitkara Full Stack Engineering Challenge Backend is running!"
  });
});

// Routes
app.use('/bfhl', bfhlRoutes);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; // Export for testing purposes
