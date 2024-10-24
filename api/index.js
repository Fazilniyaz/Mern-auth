import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
// import userRoutes from "./routes/user.routes.js";
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
