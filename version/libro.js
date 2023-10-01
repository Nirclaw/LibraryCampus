import { validationResult } from "express-validator";
import { DB } from "../config/variables.js";
import { ObjectId } from "mongodb";
let libro = await DB.collection("libro");

//buscar un libro en especifico

export const BuscarLibro = async (req, res) => {
  try {
    let data = await libro.findOne({
      titulo: req.params.titulo,
    });

    res.status(200).send({ status: 200, data });
  } catch (error) {
    res.status(200).send({ status: 404, data });
  }
};

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

    res.status(200).send({ status: 200, data });
  } catch (error) {
    res.send(error);
  }
};

//Encontrar todos los libros escritos por un autor específico.
export const Autor = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

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
      return res.send({
        status: 200,
        message: "No hay prestamos en el momento",
      });
    }

    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

//Encontrar todos los libros que están atrasados en la devolución.
export const atrasados = async (req, res) => {
  try {
    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $unwind: "$prestamos",
        },
        {
          $match: {
            "prestamos.devolucion": { $lt: new Date().toISOString() },
          },
        },
        {
          $project: {
            _id: 0,
            nombre_completo: 1,
            "prestamos.titulo": 1,
            "prestamos.autor": 1,
            "prestamos.devolucion": 1,
          },
        },
      ])
      .toArray();

    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

//Mostrar la cantidad de ejemplares disponibles para un libro en particular.

export const ejemplares = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

    let data = await libro
      .aggregate([
        {
          $match: {
            titulo: req.body.titulo,
          },
        },
        {
          $project: {
            _id: 0,
            titulo: 1,
            cantidad: 1,
            precio: 1,
          },
        },
      ])
      .toArray();

    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
//Obtener una lista de todos los autores distintos en la biblioteca.

export const autores = async (req, res) => {
  try {
    let data = await libro.distinct("autor");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

export const Generos = async (req, res) => {
  try {
    let data = await libro.distinct("genero");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

export const TitulosUnicos = async (req, res) => {
  try {
    let data = await libro.distinct("titulo");
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

///Encontrar los libros que han sido prestados por un usuario específico.

export const PrestadoaUsuario = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $match: {
            cc: number,
          },
        },
        {
          $unwind: "$prestamos",
        },
        {
          $project: {
            _id: 0,
            prestamos: 1,
            cc: 1,
            nombre_completo: 1,
          },
        },
      ])
      .toArray();
    if (Object.keys(data).length === 0) {
      return res.send({
        status: 200,
        message: "No se ha encotrado al usuario",
      });
    }
    res.send(data);
  } catch (error) {
    res.send(data);
  }
};

//Mostrar los usuarios que tienen deudas

export const mora = async (req, res) => {
  try {
    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $match: {
            deuda: { $gt: 0 },
          },
        },
        {
          $unwind: "$deuda",
        },
        {
          $project: {
            _id: 0,
            deuda: 1,
          },
        },
      ])
      .toArray();
    if (Object.keys(data).length === 0) {
      return res.send({
        status: 200,
        message: "No se ha encotrado usuarios con deudas",
      });
    }
    res.send(data);
  } catch (error) {
    res.send(data);
  }
};

//Encontrar todos los libros publicados en un rango de anos.
export const publicadosenunRangoespecifico = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

    let data = await libro
      .aggregate([
        {
          $match: {
            fecha_publicacion: {
              $gte: new Date(req.body.inicio).toISOString(),
              $lte: new Date(req.body.fin).toISOString(),
            },
          },
        },
      ])
      .toArray();
    if (Object.keys(data).length === 0) {
      return res.send({
        status: 200,
        message: "No se ha encontrado ningun libro publicado en ese rango",
      });
    }

    res.send(data);
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};

//Listar los usuarios que tienen un libro en préstamo en este momento.
export const usuarioPrestamoenestemomento = async (req, res) => {
  try {
    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $match: {
            prestamos: { $gt: [] },
          },
        },
        {
          $project: {
            permisos: 0,
            rol: 0,
            contrasena: 0,
          },
        },
      ])
      .toArray();

    res.send(data);
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};

//Mostrar la fecha de devolución más próxima
export const fechadevolucionProxima = async (req, res) => {
  try {
    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $unwind: "$prestamos",
        },
        {
          $match: {
            $and: [
              { cc: 12 },
              { "prestamos.devolucion": { $gt: new Date().toISOString() } },
            ],
          },
        },
      ])
      .toArray();
    if (Object.keys(data).length === 0) {
      return res.send({
        status: 200,
        message: "No tiene proximas fechas a vencer",
      });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};

//Encontrar todos los libros que pertenecen a una categoría específica.
export const categoria = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(200).json({ status: 500, message: error.errors[0] });

    let data = await libro
      .aggregate([
        {
          $match: {
            genero: req.params.categoria,
          },
        },
      ])
      .toArray();

    if (Object.keys(data).length === 0) {
      return res.send({
        status: 200,
        message: "No se han encontrados libros de esa categoria",
      });
    }
    res.send(data);
  } catch (error) {
    res.status(200).send({ status: 500, message: error });
  }
};

//Listar los usuarios que tienen multas por un monto superior a un valor determinado.

export const deudamayorde = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $match: {
            deuda: { $gt: parseInt(req.body.deuda) },
          },
        },
      ])
      .toArray();

    if (Object.keys(data).length === 0) {
      return res.send({
        status: 200,
        message: `No se han encontrado usuarios con deuda superior a $${req.body.deuda}`,
      });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};

//realizar un prestamos de un libro

export const PrestamoLibro = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(200).json({ status: 500, message: error.errors[0] });
    let numero = parseInt(req.body.cc);
    let usuario = await DB.collection("usuario");

    let permite = await usuario.findOne({
      cc: numero,
    });
    if (!permite)
      return res.status(200).send({
        status: 500,
        message: `El usuario no existe debe registrarse primero para poder prestar un libro`,
      });
    if (permite.deuda >= 100)
      return res.status(200).send({
        status: 500,
        message: `El usuario posee una deuda de ${permite.deuda}`,
      });
    if (permite.prestamos.length > 2)
      return res.status(200).send({
        status: 500,
        message: "El usuario ya tiene 3 libros en prestamo",
      });
    let existe = await libro.findOne({
      titulo: req.body.titulo,
    });
    if (!existe)
      return res
        .status(200)
        .send({ status: 200, message: "el libro no se ha encontrado" });
    let {
      editorial,
      fecha_publicacion,
      genero,
      idioma,
      sinopsis,
      portada,
      paginas,
      estado,
      cantidad,
      ...nuevaCopia
    } = existe;
    const entrega = new Date().toISOString();
    const devolucion = new Date(req.body.devolucion).toISOString();
    if (devolucion < entrega)
      return res.status(200).send({
        status: 500,
        message: "la fecha de devolucion debe ser mayor a la de entrega",
      });

    let fechaEntrega = {
      entrega: entrega,
      devolucion: devolucion,
    };

    Object.assign(nuevaCopia, fechaEntrega);

    let yaposee = await usuario.findOne({
      $and: [{ cc: numero }, { "prestamos.titulo": req.body.titulo }],
    });
    if (yaposee)
      return res.status(200).send({
        status: 500,
        message: "el usuario ya tiene este libro en prestamo",
      });

    let sepuederestar = await libro.findOne({
      titulo: req.body.titulo,
      cantidad: { $gt: 0 },
    });
    if (!sepuederestar)
      return res
        .status(200)
        .send({ status: 500, message: "no hay disponivilidad del libro" });

    await usuario.updateOne(
      {
        cc: numero,
      },
      {
        $push: {
          prestamos: nuevaCopia,
        },
      }
    );

    await libro.updateOne(
      {
        titulo: req.body.titulo,
        cantidad: { $gt: 0 },
      },
      { $inc: { cantidad: -1 } }
    );

    res
      .status(200)
      .send({ status: 200, message: "Prestamo realizado con exito" });
  } catch (error) {
    res.status(500).send({ status: 200, message: error });
  }
};

//devolucion de un libro

export const devolucion = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

    let usuario = await DB.collection("usuario");
    let number = parseInt(req.body.cc);

    let permite = await usuario.findOne({
      cc: number,
    });
    if (!permite)
      return res.status(500).send({
        status: 500,
        message: `El usuario no existe debe registrarse primero para poder prestar un libro`,
      });

    let libroprestado = await usuario
      .aggregate([
        {
          $match: {
            $and: [{ cc: number }, { "prestamos.titulo": req.body.titulo }],
          },
        },
        {
          $project: {
            resultado: {
              $filter: {
                input: "$prestamos",
                as: "prestamo",
                cond: { $eq: ["$$prestamo.titulo", req.body.titulo] },
              },
            },
          },
        },
        {
          $unwind: "$resultado",
        },
      ])
      .toArray();

    if (libroprestado.length === 0)
      return res.status(500).send({
        status: 500,
        message: "Este libro no se encuentra prestado por el usuario",
      });

    if (new Date().toISOString() > libroprestado[0].resultado.devolucion) {
      await usuario.updateOne(
        {
          cc: number,
        },
        {
          $inc: { deuda: +10 },
        }
      );
      await usuario.updateOne(
        {
          cc: number,
        },
        {
          $pull: { prestamos: { titulo: req.body.titulo } },
        }
      );

      await libro.updateOne(
        {
          titulo: req.body.titulo,
        },
        {
          $inc: { cantidad: 1 },
        }
      );
      return res.send({
        status: 200,
        message:
          "Se ha devuelto el libro correctamente y al usuario se le ha colocado  una multa de $10",
      });
    }

    await usuario.updateOne(
      {
        cc: number,
      },
      {
        $pull: { prestamos: { titulo: req.body.titulo } },
      }
    );

    await libro.updateOne(
      {
        titulo: req.body.titulo,
      },
      {
        $inc: { cantidad: 1 },
      }
    );

    res
      .status(200)
      .send({ status: 200, message: "Se ha devuelto el libro correctamente" });
  } catch (error) {
    res.status(500).send({ status: 200, message: error });
  }
};

//registrar un libro
export const registrarLibro = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(500).json({ status: 500, message: error.errors[0] });

    let esxite = await libro.findOne({
      titulo: req.body.titulo,
    });
    if (esxite) {
      await libro.updateOne(
        {
          titulo: req.body.titulo,
        },
        {
          $inc: { cantidad: +1 },
        }
      );
      return res
        .status(200)
        .send({ status: 200, message: "Libro ingreado correctamente" });
    }

    await libro.insertOne({
      titulo: req.body.titulo,
      autor: req.body.autor,
      editorial: req.body.editorial,
      fecha_publicacion: new Date(req.body.fecha_publicacion).toISOString(),
      genero: req.body.genero,
      idioma: req.body.idioma,
      sinopsis: req.body.sinopsis,
      portada: req.body.portada,
      paginas: req.body.paginas,
      precio: req.body.precio,
      estado: "Disponible",
      cantidad: req.body.cantidad,
    });
    res
      .status(200)
      .send({ status: 200, message: "Libro ingreado correctamente" });
  } catch (error) {
    res.status(500).send({ status: 200, message: error });
  }
};

export const acutalizarlibro = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(200).json({ status: 500, message: error.errors[0] });

    let esxite = await libro.findOne({
      _id: new ObjectId(req.body._id),
    });
    if (!esxite) {
      return res
        .status(200)
        .send({ status: 500, message: "El libro no existe" });
    }

    const newdata = await libro.updateOne(
      {
        _id: new ObjectId(req.body._id),
      },
      {
        $set: {
          titulo: req.body.titulo,
          autor: req.body.autor,
          editorial: req.body.editorial,
          fecha_publicacion: new Date(req.body.fecha_publicacion).toISOString(),
          genero: req.body.genero,
          idioma: req.body.idioma,
          sinopsis: req.body.sinopsis,
          portada: req.body.portada,
          paginas: req.body.paginas,
          precio: req.body.precio,
          estado: "Disponible",
          cantidad: req.body.cantidad,
        },
      }
    );
    res.status(200).send({
      status: 200,
      message: "Libro actualizado correctamente",
      newdata,
    });
  } catch (error) {
    res.status(500).send({ status: 200, message: error });
  }
};
