require("dotenv").config(); // Load environment variables
const app = require("./server"); // Import the Express app from server.js
const connectDB = require("./config/db"); // Import the database connection

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
