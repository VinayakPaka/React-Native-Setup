import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config()
connectDB()

const app = express();

app.use(cors({
    origin: '*', // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

app.use(express.json());

app.use("/api/auth/", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});