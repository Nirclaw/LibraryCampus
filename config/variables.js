import { loadEnv } from "vite";
import { db } from "../conexion/connect.js";
import routesVersioning from "express-routes-versioning";
let env = loadEnv("development", process.cwd(), "VITE")


export const MY_SERVER = JSON.parse(env.VITE_MY_SERVER)
export const MY_KEY = env.VITE_MY_KEY
export const MY_DB = env.VITE_MY_DB
export const MY_ATLAS_PASS = env.VITE_MY_ATLAS_PASS
export const USUARIO = env.VITE_MY_USUARIO
export const DB = await db()
export const VERSION = routesVersioning()