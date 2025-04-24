import express from "express";
import cors from 'cors'

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";


export const app = express();

app.use(express.json())
app.use(cors({
  origin: 'https://we-are-gamers.netlify.app',
  credentials: true
}))

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

