// Import required modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js'
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from './db/connectToMongoDB.js';

// Create an instance of express app
const app = express();

// Define the port
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
// Define a simple route for testing
/* app.get('/', (req, res) => {
  res.send('Hello chatting app!!');
}); */

// Load environment variables from .env file
dotenv.config();

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
  connectToMongoDB();
});
