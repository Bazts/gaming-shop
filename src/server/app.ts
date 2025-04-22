import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cors from 'cors'


export const app = express();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

