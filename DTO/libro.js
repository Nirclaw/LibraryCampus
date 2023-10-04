import { check } from "express-validator";

export const autorDTO = [
  check("autor")
    .notEmpty()
    .withMessage("El nombre del autor debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
];

export const titulo = [
  check("titulo")
    .notEmpty()
    .withMessage("El titulo del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
];

export const cc = [
  check("cc")
    .notEmpty()
    .withMessage("La cedula debe ser obligatoria")
    .isNumeric()
    .withMessage("el tipo de dato debe ser numerico"),
];

export const fechaInicioFin = [
  check("inicio")
    .notEmpty()
    .withMessage("La Fecha inicio debe ser obligatoria")
    .isISO8601()
    .toDate()
    .withMessage("El formato de la fecha debe ser YYYY-MM-DD "),

  check("fin")
    .notEmpty()
    .withMessage("La Fecha fin debe ser obligatoria")
    .isISO8601()
    .toDate()
    .withMessage("El formato de la fecha debe ser YYYY-MM-DD "),
];

export const categoria = [
  check("categoria")
    .notEmpty()
    .withMessage("La categoria del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
];

export const valor = [
  check("valor")
    .notEmpty()
    .withMessage("El valor de la deuda debe ser obligatoria")
    .isNumeric()
    .withMessage("el tipo de dato debe ser numerico"),
];

export const prestamo = [
  check("cc")
    .notEmpty()
    .withMessage("La cedula debe ser obligatoria")
    .isNumeric()
    .withMessage("el tipo de dato debe ser numerico"),
  check("devolucion")
    .notEmpty()
    .withMessage("La Fecha devolucion debe ser obligatoria")
    .isISO8601()
    .toDate()
    .withMessage("El formato de la fecha debe ser YYYY-MM-DD "),
  check("titulo")
    .notEmpty()
    .withMessage("El titulo del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
];

export const devolucionDto = [
  check("cc")
    .notEmpty()
    .withMessage("La cedula debe ser obligatoria")
    .isNumeric()
    .withMessage("el tipo de dato debe ser numerico"),

  check("titulo")
    .notEmpty()
    .withMessage("El titulo del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
];

export const registrar = [
  check("titulo")
    .notEmpty()
    .withMessage("El titulo del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("autor")
    .notEmpty()
    .withMessage("El nombre del autor debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("editorial")
    .notEmpty()
    .withMessage("la editorial del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("fecha_publicacion")
    .notEmpty()
    .withMessage("La Fecha devolucion debe ser obligatoria")
    .isISO8601()
    .toDate()
    .withMessage("El formato de la fecha debe ser YYYY-MM-DD "),
  check("genero")
    .notEmpty()
    .withMessage("el genero del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("idioma")
    .notEmpty()
    .withMessage("el idioma del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("sinopsis")
    .notEmpty()
    .withMessage("la sinopsis del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("portada")
    .notEmpty()
    .withMessage("la portada del libro debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("paginas")
    .notEmpty()
    .withMessage("las paginas del libro debe ser obligatorio")
    .isNumeric()
    .withMessage("el tipo de dato debe ser texto"),
  check("precio")
    .notEmpty()
    .withMessage("El precio del libro debe ser obligatorio")
    .isFloat()
    .withMessage("el tipo de dato debe ser texto"),
  check("cantidad")
    .notEmpty()
    .withMessage("La cantidad de libros deben ser obligatorias")
    .isNumeric()
    .withMessage("el tipo de dato debe ser texto"),
];

