import { DB } from "../config/variables.js";
let libro = await DB.collection("libro");

//Mostrar todos los libros disponibles en la biblioteca.
export const Getlibros = async (req, res) => {
  try {
    let data = await libro
      .aggregate([
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray();

    res.send(data);
  } catch (error) {
    res.send("error");
  }
};

//Encontrar todos los libros escritos por un autor específico.
export const Autor = async (req, res) => {
  try {
    let data = await libro
      .aggregate([
        {
          $match: { autor: req.body.autor },
        },
        {
          $project: { _id: 0 },
        },
      ])
      .toArray();
    if (Object.keys(data).length === 0) {
      return res.send({ status: 200, message: "El autor no esta registrado" });
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

//Listar todos los libros en préstamo en este momento.
export const Prestamos = async (req, res) => {
  try {
    let usuario = await DB.collection("usuario");

    let data = await usuario
      .aggregate([
        {
          $unwind: "$prestamos",
        },
        {
          $group: {
            _id: null,
            prestamos: { $push: "$prestamos" },
          },
        },
        {
          $addFields: {
            LibrosPrestadosEnesteMomento: "$prestamos",
          },
        },
        {
          $unwind: "$LibrosPrestadosEnesteMomento",
        },
        {
          $project: {
            _id: 0,
            LibrosPrestadosEnesteMomento: 1,
          },
        },
      ])
      .toArray();
      if (Object.keys(data).length === 0) {
        return res.send({ status: 200, message: "No hay prestamos en el momento" });
      }

    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
