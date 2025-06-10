import bcrypt from "bcrypt";

import type { RouteHandler } from "../types/routeHandler";
import { db } from "../config/sequelizeClient";

export const registerUser: RouteHandler = async (req, res) => {
  try {
    const { email, password, full_name: fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Email, nombre completo y contraseña son obligatorios" });
    }

    const existing = await db.User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Usuario ya registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.User.create({ email, password: hashed, fullName });

    return res.status(201).json({ id: user.fullName, email: user.email });
  } catch (error) {
    console.error("Error en registerUser:", error);
    return res.status(500).json({ error: "Error interno al registrar usuario" });
  }
};

export const loginUser: RouteHandler = async (req, res) => {
  console.log('login')
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    
    const user = await db.User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const refreshToken = jwt.sign({ userId: user.id }, String(JWT_SECRET), { expiresIn: '365d'})
    const accessToken = jwt.sign({ userId: user.id }, String(JWT_SECRET), { expiresIn: '15m'})
    
    return res
      .status(200)
      .cookie('refresh_token', refreshToken, {
        maxAge: 365 * 24 * 60 * 60 * 1000
      })
      .json({ 
      user: {
        fullName: user.fullName,
        email: user.email,
        accessToken
      }
     })
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ error: "Error interno al iniciar sesión" });
  }
};

export const logoutUser: RouteHandler = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.json({ success: true, message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error en logoutUser:", error);
    return res.status(500).json({ error: "Error interno al cerrar sesión" });
  }
};
