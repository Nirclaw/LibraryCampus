import express from "express";
import { MY_SERVER } from "./config/variables.js";
import { appLibros } from "./routers/libros.js";
import { appUsuario } from "./routers/usuario.js";
import { appLogin } from "./login/login.js";
const appExpress = express()
appExpress.use(express.json())

appExpress.use("/log",appLogin)
appExpress.use("/libros",appLibros)

appExpress.use("/usuario",appUsuario)

appExpress.listen(MY_SERVER,()=>{
    console.log(`http://${MY_SERVER.host}:${MY_SERVER.port}`);
})
