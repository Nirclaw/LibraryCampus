import { Router } from "express";
import passport from "../jwt/passport.js";
import { limite } from "../config/limit.js";
import { VERSION } from "../config/variables.js";
import { PerfilUsuario, actualizar, existentes } from "../version/usuario.js";
import { Registrar } from "../DTO/register.js";
import { token } from "../jwt/jwt.js";

export const appUsuario = Router();
appUsuario.use(limite(), passport.authenticate("bearer", { session: false }));

appUsuario.get("/token",
  VERSION({
    "1.0.0": token
  })
)
appUsuario.get(
  "/existentes",
  VERSION({
    "1.0.0": existentes,
  })
);

appUsuario.put(
  "/actualizar",
  Registrar,
  VERSION({
    "1.0.0": actualizar,
  })
);

appUsuario.get(
  "/:cc",
  VERSION({
    "1.0.0": PerfilUsuario,
  })
);


