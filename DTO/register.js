import { check } from "express-validator";

export const Registrar = [
  check("cc")
    .notEmpty()
    .withMessage("La cedula debe ser obligatoria")
    .isNumeric()
    .withMessage("el tipo de dato debe ser numerico"),

  check("nombre_completo")
    .notEmpty()
    .withMessage("El nombre_completo debe ser obligatorio")
    .isString()
    .withMessage("El tipo de dato debe ser texto")
    .matches(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/)
    .withMessage("El nombre_completo solo debe contener letras y espacios"),

  check("edad")
    .notEmpty()
    .withMessage("La edad debe ser obligatoria")
    .isNumeric()
    .withMessage("el tipo de dato debe ser numerico"),

  check("sexo")
    .notEmpty()
    .withMessage("El sexo debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
  check("contrasena")
    .notEmpty()
    .withMessage("La contrasena debe ser obligatorio")
    .isString()
    .withMessage("el tipo de dato debe ser texto"),
];
