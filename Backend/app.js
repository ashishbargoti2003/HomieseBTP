import express from 'express';
import cors from 'cors';
import { PORT, ORIGIN } from './config/env.js';
import authRouter from "./route/auth.route.js";
import connectToDatabase from "./database/mongoose.js";
import cookieParser from "cookie-parser";
import profileRouter from "./route/profile.route.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enhanced CORS configuration
app.use(cors({
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Added OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Explicit headers
  credentials: true
}));

// Explicitly handle preflight requests
app.options('*', cors());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);

// Test endpoints
app.get('/change', (req, res) => {
  res.send("Hello from the backend");
});

app.post('/change', (req, res) => {
  console.log(req.body);
});

// Server start
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server started on port http://localhost:${PORT}`);
});