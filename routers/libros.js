import { Router } from "express";
import { VERSION } from "../config/variables.js";
import {
  Autor,
  BuscarLibro,
  Generos,
  Getlibros,
  PrestadoaUsuario,
  PrestamoLibro,
  Prestamos,
  TitulosUnicos,
  acutalizarlibro,
  atrasados,
  autores,
  categoria,
  deudamayorde,
  devolucion,
  ejemplares,
  fechadevolucionProxima,
  mora,
  publicadosenunRangoespecifico,
  registrarLibro,
  usuarioPrestamoenestemomento,
} from "../version/libro.js";
import passport from "../jwt/passport.js";
import { limite } from "../config/limit.js";
import {
  autorDTO,
  cc,
  devolucionDto,
  fechaInicioFin,
  prestamo,
  registrar,
  titulo,
  valor,
} from "../DTO/libro.js";

export const appLibros = Router();

appLibros.use(limite(), passport.authenticate("bearer", { session: false }));


appLibros.get(
  "/todainfo",
  VERSION({
    "1.0.0": TitulosUnicos,
  })
);
appLibros.get(
  "/",
  VERSION({
    "1.0.0": Getlibros,
  })
);

appLibros.get(
  "/autores",
  VERSION({
    "1.0.0": autores,
  })
);

appLibros.get(
  "/generos",
  VERSION({
    "1.0.0": Generos,
  })
);
appLibros.get(
  "/:titulo",
  VERSION({
    "1.0.0": BuscarLibro,
  })
);

appLibros.get(
  "/autor",
  autorDTO,
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
  "/PrestadoaUsuario",
  cc,
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
  fechaInicioFin,
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
  "/categoria/:categoria",
  VERSION({
    "1.0.0": categoria,
  })
);
appLibros.get(
  "/deudamayorde",
  valor,
  VERSION({
    "1.0.0": deudamayorde,
  })
);

appLibros.post(
  "/prestamoLibro",
  prestamo,
  VERSION({
    "1.0.0": PrestamoLibro,
  })
);

appLibros.post(
  "/devolucion",
  devolucionDto,
  VERSION({
    "1.0.0": devolucion,
  })
);

appLibros.post(
  "/registrar",
  registrar,
  VERSION({
    "1.0.0": registrarLibro,
  })
);

appLibros.put(
  "/actualizar",
  registrar,
  VERSION({
    "1.0.0": acutalizarlibro,
  })
);



