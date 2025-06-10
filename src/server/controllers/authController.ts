import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

import type { RouteHandler } from "../types/routeHandler";
import { db } from "../config/sequelizeClient";
import { JWT_SECRET } from "../config";
import { ErrorHandler } from "../utils/errorHandler";

export const registerUser: RouteHandler = async (req, res) => {
    const { email, password, full_name: fullName } = req.body;
    if (!email || !password || !fullName) {
          throw new ErrorHandler(400, 'Email, nombre completo y contraseña son obligatorios', {
        errors: ['Email, nombre completo y contraseña son obligatorios']
      })
    }

    const existing = await db.User.findOne({ where: { email } });

    if (existing) {
      throw new ErrorHandler(409, 'Usuario ya registrado. Email no disponible', {
        errors: ['Usuario ya registrado. Email no disponible']
      })
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await db.User.create({ email, password: hashed, fullName });

    return res.status(201).json({ id: user.fullName, email: user.email });
};

export const loginUser: RouteHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler(409, 'Email y contraseña son obligatorios', {
        errors: ['Email y contraseña son obligatorios']
      })
    }
    
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      throw new ErrorHandler(409, 'Credenciales inválidas', {
        errors: ['Credenciales inválidas']
      })
    }
    const passwordMatch = await bcrypt.compare(password, user?.password)
    
    if (!passwordMatch) {
      throw new ErrorHandler(409, 'Credenciales inválidas', {
        errors: ['Credenciales inválidas']
      })
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
