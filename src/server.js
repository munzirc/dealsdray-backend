import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

dotenv.config();

const app = express();

const mongoURI = process.env.MONGODB;
const port = process.env.PORT;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});
