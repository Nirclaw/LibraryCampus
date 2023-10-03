import { Categorias } from "./Categorias";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Autchontext } from "../../auth/context/Autchontext"; // Corregir la importación del contexto

export const MenuCategorias = () => {
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER)

  const { user } = useContext(Autchontext);
  const [tarjetas, setTarjetas] = useState([]);

  const headers = {
    headers: {
      "Accept-version": "1.0.0",
      Authorization: `Bearer ${user.user}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${url.host}:${url.port}/libro/generos`,
          headers
        );
        const genero = response.data;
        const tarjetas = genero.map((categoria) => (
          <Categorias key={categoria} categoria={categoria} />
        ));
        setTarjetas(tarjetas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); // Agregar dependencia vacía para que useEffect se ejecute una sola vez al montar el componente
  return <li> {tarjetas}</li>;
};
