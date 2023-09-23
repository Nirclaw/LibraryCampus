import express from "express";
import { MY_SERVER } from "./config/variables.js";
import { appLibros } from "./routers/libros.js";
import { appUsuario } from "./routers/usuario.js";
import { appLogin } from "./login/login.js";
import cors from "cors";
import { appRegister } from "./login/register.js";
const appExpress = express();
appExpress.use(express.json());
appExpress.use(cors());

appExpress.use("/login", appLogin);
appExpress.use("/libro", appLibros);
appExpress.use("/register",appRegister)
appExpress.use("/usuario", appUsuario);

appExpress.listen(MY_SERVER, () => {
  console.log(`http://${MY_SERVER.host}:${MY_SERVER.port}`);
});
