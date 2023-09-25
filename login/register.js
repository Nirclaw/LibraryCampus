import { Router } from "express";
import { limite } from "../config/limit.js";
import { DB } from "../config/variables.js";
import { registrar } from "../DTO/libro.js";
export const appRegister = Router();
let usuario = await DB.collection("usuario");

appRegister.use(limite());

appRegister.post("/",registrar, async (req, res) => {
  try {
    let data = await usuario.findOne({
      cc: req.body.cc,
    });
    if (data)
      return res.status(500).send({
        status: 500,
        message: "La cedula ya esta registrada en el sistema",
      });

    await usuario.insertOne({
      cc: req.body.cc,
      nombre_completo: req.body.nombre_completo,
      edad: req.body.edad,
      sexo: req.body.sexo,
      rol: "user",
      permisos: {
        "/usuario": ["1.0.0"],
        "/libro": ["1.0.0"],
      },
      contrasena: req.body.contrasena,
      deuda: 0,
      reportes: [],
      prestamos: [],
      reservados: [],
    });
    res
      .status(200)
      .send({ status: 200, message: "usuario creado exitosamente" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
});
