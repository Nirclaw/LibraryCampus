import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autchontext } from "../../auth/context/Autchontext";
import axios from "axios";

export const TablaLibrosPrestados = ({ info }) => {
  const { user } = useContext(Autchontext);
  const [dataPerfil, setdataPerfil] = useState(null); // Inicializa como null
  const [isLoading, setIsLoading] = useState(true);

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
          `http://127.10.10.10:5100/usuario/${info.cc}`,
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
  }, [info]);

  if (isLoading) {
    return (
      <div
        className="spinner-grow"
        style={{"width": "10rem", "height": "10rem"}}
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
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Libros</th>
          <th scope="col">Fecha de prestamo</th>
          <th scope="col">Fecha de devolucion</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};
