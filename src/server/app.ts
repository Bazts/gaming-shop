import express from "express";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cors from 'cors'


export const app = express();

app.use(express.json())
// https://we-are-gamers.netlify.app
// app.use(cors({
//   origin: 'https://we-are-gamers.netlify.app',
//   credentials: true
// }))
app.options('*', cors({
  credentials: true
}));


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

