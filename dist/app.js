import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
config({
    path: "./.env",
});
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
connectDB(MONGO_URI);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Welcome, API working with /api");
});
// Auth routes
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
