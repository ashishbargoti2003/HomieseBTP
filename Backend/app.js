import express from 'express';
import cors from 'cors'
import {PORT,  ORIGIN} from './config/env.js'
import authRouter from "./route/auth.route.js";
import connectToDatabase from "./database/mongoose.js";
import cookieParser from "cookie-parser"
import profileRouter from "./route/profile.route.js";


const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cors({
//   origin: ORIGIN,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   credentials: true
// }))

// app.use("/api/v1/auth" , authRouter);
const ORIGIN = process.env.ORIGIN  // must be exactly "https://homiese-app.vercel.app"
const corsOptions = {
  origin: ORIGIN,
  credentials: true,
  // you can omit `methods` entirely to use the cors defaults,
  // or be sure to include 'OPTIONS' if you do override it:
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  // if you’re using any custom headers, list them here:
  allowedHeaders: ['Content-Type','Authorization']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))  // explicitly handle preflight
app.use(express.json())
// …now mount your routers:
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/profile" , profileRouter);


app.get('/change', (req, res) => {
  res.send("Hello from the backend");
})

app.post('/change', (req, res) => {
  console.log(req.body);
})


app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server started on port http://localhost:${PORT}`);
})
