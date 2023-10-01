import { validationResult } from "express-validator";
import { DB } from "../config/variables.js";

let usuario = await DB.collection("usuario");

export const actualizar = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(200).json({ status: 500, message: error.errors[0] });

    let existe = await usuario.findOne({
      cc: req.body.cc,
    });

    if (!existe)
      return res.send({ status: 500, message: "el usuario no existe" });

    let {
      _id,
      cc,
      nombre_completo,
      edad,
      sexo,
      rol,
      permisos,
      contrasena,
      ...copia
    } = existe;

    await usuario.updateOne(
      {
        cc: req.body.cc,
      },
      {
        $set: {
          cc: req.body.cc,
          nombre_completo: req.body.nombre_completo,
          edad: req.body.edad,
          sexo: req.body.sexo,
          contrasena: req.body.contrasena,
          deuda: copia.deuda,
          rol: "user",
          permisos: {
            "/usuario": ["1.0.0"],
            "/libro": ["1.0.0"],
          },
          reportes: copia.reportes,
          prestamos: copia.prestamos,
          reservados: copia.reservados,
        },
      }
    );

    res.status(200).send({ status: 200, message: "Actualizado correctamente" });
  } catch (error) {
    res.status.send({ status: 500, message: error });
  }
};

export const PerfilUsuario = async (req, res) => {
  try {
    let data = await usuario.findOne({
      cc: parseInt(req.params.cc),
    });
    return res.status(200).send({ status: 200, data });
  } catch (error) {}
};
