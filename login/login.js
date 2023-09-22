import { Router } from "express";
import { CrearToken } from "../jwt/jwt.js";

export const appLogin = Router()

appLogin.use("/", CrearToken);