import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import predictRoutes from "./Routers/predictRoutes.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect MongoDB only once
connectDB();

// ✅ Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public")); // Serve uploaded images

// ✅ CORS Setup
const allowedOrigins = [
  "https://expense-tracker-app-three-beryl.vercel.app", // Production site
  "http://localhost:3000", // Local frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ Define Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/v1", predictRoutes); // Prediction route

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
