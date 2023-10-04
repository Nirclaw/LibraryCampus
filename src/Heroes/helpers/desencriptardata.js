import axios from "axios";
const url = JSON.parse(import.meta.env.VITE_MY_SERVER)

export const validarToken = async (user) => {
  try {
    const headers = {
      headers: {
        "Accept-version": "1.0.0",
        Authorization: `Bearer ${user}`,
      },
    };
    const data = await axios.get(`http://${url.host}:${url.port}/usuario/token`, headers)
    const devolver = data.data.data.payload.id[0]
    return devolver;
  } catch (error) {
    return console.log(error);;
  }
};
