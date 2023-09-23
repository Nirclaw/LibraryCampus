import { Router } from "express";
import { VERSION } from "../config/variables.js";
import {
  Autor,
  Getlibros,
  PrestadoaUsuario,
  PrestamoLibro,
  Prestamos,
  atrasados,
  autores,
  categoria,
  deudamayorde,
  devolucion,
  ejemplares,
  fechadevolucionProxima,
  mora,
  publicadosenunRangoespecifico,
  usuarioPrestamoenestemomento,
} from "../version/libro.js";
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

appLibros.get(
  "/atrasados",
  VERSION({
    "1.0.0": atrasados,
  })
);

appLibros.get(
  "/ejemplares",
  VERSION({
    "1.0.0": ejemplares,
  })
);

appLibros.get(
  "/autores",
  VERSION({
    "1.0.0": autores,
  })
);

appLibros.get(
  "/PrestadoaUsuario",
  VERSION({
    "1.0.0": PrestadoaUsuario,
  })
);
appLibros.get(
  "/deuda",
  VERSION({
    "1.0.0": mora,
  })
);

appLibros.get(
  "/publicadosenunRangoespecifico",
  VERSION({
    "1.0.0": publicadosenunRangoespecifico,
  })
);

appLibros.get(
  "/usuarioPrestamoenestemomento",
  VERSION({
    "1.0.0": usuarioPrestamoenestemomento,
  })
);

appLibros.get(
  "/fechadevolucionProxima",
  VERSION({
    "1.0.0": fechadevolucionProxima,
  })
);

appLibros.get(
  "/categoria",
  VERSION({
    "1.0.0": categoria,
  })
);
appLibros.get(
  "/deudamayorde",
  VERSION({
    "1.0.0": deudamayorde,
  })
);

appLibros.post(
  "/prestamoLibro",
  VERSION({
    "1.0.0": PrestamoLibro,
  })
);

appLibros.post(
  "/devolucion",
  VERSION({
    "1.0.0": devolucion,
  })
);
