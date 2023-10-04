import React, { useContext, useEffect, useState } from "react";
import { Autchontext } from "../../../auth/context/Autchontext";
import axios from "axios";
import { Link } from "react-router-dom";

export const TablaUsuarioAdmin = ({ data }) => {
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER);

  const { user } = useContext(Autchontext);
  const [desactivarBotones, setDesactivarBotones] = useState({});
  const [Mensaje, setMensaje] = useState("");
  const [dataPerfil, setdataPerfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(false);
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
          `http://${url.host}:${url.port}/usuario/${data.cc}`,
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
  const OnRecibir = async (eve) => {
    const titulo = eve.target.id;
    const body = { titulo: titulo, cc: dataPerfil.cc };
    setDesactivarBotones((prevDesactivarBotones) => ({
      ...prevDesactivarBotones,
      [titulo]: true,
    }));

    const respuesta = await axios.post(
      `http://${url.host}:${url.port}/libro/devolucion`,
      body,
      headers
    );
    if (respuesta.status === 200) {
      setError(true);
      setMensaje(respuesta.data.message);
    }
  };
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
              <td>{data.contrasena}</td>
              <td>{data.rol}</td>

              <td>
                <Link
                  className="btn btn-outline-primary"
                  to={`/admin/usuario/${data.cc}`}
                >
                  editar
                </Link>
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
                    to={`/libro/${libro.titulo}`}
                  >
                    {libro.titulo}
                  </Link>
                </td>
                <td>{new Date(libro.entrega).toLocaleDateString()}</td>
                <td>{new Date(libro.devolucion).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={OnRecibir}
                    id={libro.titulo}
                    disabled={desactivarBotones[libro.titulo]}
                  >
                    Recibir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Error === true ? (
        <div className="alert alert-success" role="alert">
          {Mensaje}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
