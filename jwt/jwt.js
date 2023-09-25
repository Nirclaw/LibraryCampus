import { SignJWT, jwtVerify } from "jose";
import { DB, MY_KEY } from "../config/variables.js";
import { ObjectId } from "mongodb";

export const CrearToken = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).send({ status: 400, message: "Datos no enviados" });

  const busqueda = await DB.collection("usuario")
    .aggregate([
      {
        $match: {
          $and: [{ cc: req.body.cc }, { contrasena: req.body.contrasena }],
        },
      },
    ])
    .toArray();

  if (Object.keys(busqueda).length === 0)
    return res
      .status(400)
      .send({ status: 400, message: "el usuario no existe" });

  const id = busqueda;
  const encode = new TextEncoder();
  const create = await new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("3h")
    .sign(encode.encode(MY_KEY));

  const llave = "Bearer " + create;
  res.send({ status: 200, message: llave });
};

export const validarToken = async (req, Token) => {
  try {
    const encode = new TextEncoder();
    const jwtData = await jwtVerify(Token, encode.encode(MY_KEY));

    let busqueda = await DB.collection("usuario").findOne({
      
      _id: new ObjectId(jwtData.payload.id[0]._id),
      [`permisos.${req.baseUrl}`]: [`${req.headers["accept-version"]}`],
    });
    let { _id, permisos, ...Usuario } = busqueda;

    return Usuario;
  } catch (error) {
    return false;
  }
};
