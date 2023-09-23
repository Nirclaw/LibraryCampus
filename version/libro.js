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

///Encontrar los libros que han sido prestados por un usuario específico.

export const PrestadoaUsuario = async (req, res) => {
  try {
    let usuario = await DB.collection("usuario");
    let data = await usuario
      .aggregate([
        {
          $match: {
            cc: req.body.cc,
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

//Mostrar la fecha de devolución más próxima para un usuario en particular.
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
    let data = await libro
      .aggregate([
        {
          $match: {
            genero: req.body.categoria,
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
    res.status(500).send({ status: 500, message: error });
  }
};

//Listar los usuarios que tienen multas por un monto superior a un valor determinado.

export const deudamayorde = async (req, res) => {
  try {
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
    let usuario = await DB.collection("usuario");

    let permite = await usuario.findOne({
      cc: req.body.cc,
    });
    if (permite.deuda >= 100)
      return res.status(500).send({
        status: 500,
        message: `El usuario posee una deuda de ${permite.deuda}`,
      });
    if (permite.prestamos.length > 2)
      return res.status(500).send({
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
      return res.status(500).send({
        status: 500,
        message: "la fecha de devolucion debe ser mayor a la de entrega",
      });

    let fechaEntrega = {
      entrega: entrega,
      devolucion: devolucion,
    };

    Object.assign(nuevaCopia, fechaEntrega);

    let yaposee = await usuario.findOne({
      $and: [{ cc: req.body.cc }, { "prestamos.titulo": req.body.titulo }],
    });
    if (yaposee)
      return res.status(500).send({
        status: 500,
        message: "el usuario ya tiene este libro en prestamo",
      });

    let sepuederestar = await libro.findOne({
      titulo: req.body.titulo,
      cantidad: { $gt: 0 },
    });
    if (!sepuederestar)
      return res
        .status(500)
        .send({ status: 500, message: "no hay disponivilidad del libro" });

    await usuario.updateOne(
      {
        cc: req.body.cc,
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
