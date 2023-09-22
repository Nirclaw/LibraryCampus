import { Router } from "express";

export const appLibros = Router()

appLibros.get("/hola", (req, res) => {
    res.send("funcionando :)")
})

