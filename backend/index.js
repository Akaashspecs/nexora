import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow all origins (for local dev)
app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Correct routes

app.use("/api/cart", productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
