import axios from "axios";
import { jwtVerify } from "jose";
export const validarToken = async (user) => {
  try {
    const headers = {
      headers: {
        "Accept-version": "1.0.0",
        Authorization: `Bearer ${user}`,
      },
    };
    const data = await axios.get("http://192.168.129.72:5181/usuario/token", headers)
    const devolver = data.data.data.payload.id[0]
    return devolver;
  } catch (error) {
    return console.log(error);;
  }
};
