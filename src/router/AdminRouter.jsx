import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ActualizarLibro } from "../Heroes/pages/Admin/ActualizarLibro";
import { NavarBookAdmin } from "../ui/components/NavarBookAdmin";
import { VistaAdmin } from "../Heroes/pages/Admin/VistaAdmin";
import { Actualizarusuario } from "../Heroes/pages/Admin/Actualizarusuario";
import { IngresarLinbro } from "../Heroes/pages/Admin/IngresarLinbro";
import { BookAdmin } from "../Heroes/components/Admin/BookAdmin";
import { FormularioActualizarUsuarioAdmin } from "../Heroes/components/Admin/FormularioActualizarUsuarioAdmin";
export const AdminRouter = () => {
  return (
    <>
      <NavarBookAdmin />
      <Routes>
        <Route path="/" element={<VistaAdmin />} />

        <Route path="/actualizar/libro/" element={<ActualizarLibro />} />

        <Route path="libro/:titulo" element={<BookAdmin />} />
        <Route path="usuario/:cc" element={<FormularioActualizarUsuarioAdmin />} />

        <Route path="/actualizar/usuario" element={<Actualizarusuario />} />
        <Route path="/insertar/NuevoLibro" element={<IngresarLinbro />} />
        actualizar
        <Route path="/*" element={<Navigate to="/admin" />} />
      </Routes>
    </>
  );
};
