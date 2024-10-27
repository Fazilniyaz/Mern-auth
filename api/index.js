import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

configDotenv();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Successfully connected Database");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
