import express from 'express';
import cors from 'cors';
import { PORT, ORIGIN } from './config/env.js';
import authRouter from "./route/auth.route.js";
import connectToDatabase from "./database/mongoose.js";
import cookieParser from "cookie-parser";
import profileRouter from "./route/profile.route.js";

const app = express();

// Middleware Order Matters!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enhanced CORS Configuration
const corsOptions = {
  origin: ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'X-Requested-With',
    'Cookie',
    'Accept'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicit OPTIONS handler for /api/v1/auth routes
app.options('/api/v1/auth/*', cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);

// Server start
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server started on port http://localhost:${PORT}`);
});