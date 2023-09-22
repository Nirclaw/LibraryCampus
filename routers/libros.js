import { Router } from "express";
import { VERSION } from "../config/variables.js";
import { Autor, Getlibros, Prestamos } from "../version/libro.js";
import passport from "../jwt/passport.js";
import { limite } from "../config/limit.js";

export const appLibros = Router();

appLibros.use(limite(), passport.authenticate("bearer", { session: false }));

appLibros.get(
  "/",
  VERSION({
    "1.0.0": Getlibros,
  })
);

appLibros.get(
  "/autor",
  VERSION({
    "1.0.0": Autor,
  })
);

appLibros.get(
  "/prestamos",
  VERSION({
    "1.0.0": Prestamos,
  })
);
