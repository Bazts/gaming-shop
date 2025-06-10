import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cors from 'cors'
import { errorMiddleware } from "./middlewares/errorMiddleware";


export const app = express();

app.use(express.json())
https://we-are-gamers.netlify.app
app.use(cors({
  origin: 'https://we-are-gamers.netlify.app',
  credentials: true
}))


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware)

