import { jwtVerify } from "jose";

export const validarToken = async (Token) => {
  try {
    const encode = new TextEncoder();
    const jwtData = await jwtVerify(Token, encode.encode(import.meta.env.VITE_MY_KEYS));
    const respuesta = await jwtData.payload.id;
    return respuesta;
  } catch (error) {
    return false;
  }
};
