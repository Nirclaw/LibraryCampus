import { Router } from "express";
import passport from "../jwt/passport.js";
import { limite } from "../config/limit.js";
import { VERSION } from "../config/variables.js";
import { actualizar } from "../version/usuario.js";
import { Registrar } from "../DTO/register.js";

export const appUsuario = Router()
appUsuario.use(limite(), passport.authenticate("bearer", { session: false }));

appUsuario.put("/actualizar",Registrar,VERSION({
    "1.0.0":actualizar
}))