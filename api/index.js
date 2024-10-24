import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

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
