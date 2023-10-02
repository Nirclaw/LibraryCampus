import React, { useContext, useEffect, useState } from "react";
import { Autchontext } from "../../../auth/context/Autchontext";
import axios from "axios";
import { Link } from "react-router-dom";

export const TablaUsuarioAdmin = ({ data }) => {
  const { user } = useContext(Autchontext);
  const [dataPerfil, setdataPerfil] = useState(null); // Inicializa como null
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);
  const headers = {
    headers: {
      "Accept-version": "1.0.0",
      Authorization: `Bearer ${user.user}`,
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.10.10.10:5100/usuario/${data.cc}`,
          headers
        );
        const perfilData = await response.data.data;
        setdataPerfil(perfilData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [data]);

  if (isLoading) {
    return (
      <div
        className="spinner-grow"
        style={{ width: "10rem", height: "10rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
    // Muestra un mensaje de carga mientras se obtienen los datos
  }

  // Verifica si `libros` contiene datos antes de intentar acceder a propiedades
  const libros = dataPerfil?.prestamos ?? [];
  return (
    <div className="contendeor-tablaAdmin">
      <div className="tabla-infousuarioAdmin">
        <h4 className="contenedor-infoAdmin">Info usuario</h4>
        <table className="tabla-contenidoadmin table table-striped">
          <thead>
            <tr className="fs-4">
              <th scope="col">CC</th>
              <th scope="col">Edad</th>
              <th scope="col">Sexo</th>
              <th scope="col">Deuda</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Rol</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td className="mt-10">{data.cc}</td>
              <td>{data.nombre_completo}</td>
              <td>{data.sexo}</td>
              <td>{data.deuda}</td>
              <td>{data.rol}</td>
              <td>{data.contrasena}</td>

              <td>
                <button className="btn btn-outline-primary">editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tabla-infousuarioAdmin">
        <h4 className="contenedor-infoAdmin">Prestamos</h4>
        <table className="tabla-contenidoadmin table table-striped">
          <thead>
            <tr>
              <th scope="col">Libros</th>
              <th scope="col">Fecha de prestamo</th>
              <th scope="col">Fecha de devolucion</th>
              <th scope="col"></th>
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {libros.map((libro, index) => (
              <tr key={index}>
                <td>
                  <Link
                    className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    to={`/libro/${libro.titulo}`} // Reemplaza con la URL correcta
                  >
                    {libro.titulo}
                  </Link>
                </td>
                <td>{new Date(libro.entrega).toLocaleDateString()}</td>
                <td>{new Date(libro.devolucion).toLocaleDateString()}</td>
                <td>
                <button className="btn btn-outline-primary">
            Recibir</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
