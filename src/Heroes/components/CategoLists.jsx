import React, { useContext, useEffect, useState } from "react";
import { Autchontext } from "../../auth/context/Autchontext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LibroCards } from "./LibroCards";

export const CategoLists = () => {
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER)

  const { user } = useContext(Autchontext);
  const { genero } = useParams();
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
          `http://${url.host}:${url.port}/libro/categoria/${genero}`,
          headers
        );
        const result = response.data;
        const tarjetas = result.map((libro) => (
          <LibroCards key={libro.titulo} {...libro} />
        ));
        setTarjetas(tarjetas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [genero]); // Agregar dependencia vacía para que useEffect se ejecute una sola vez al montar el componente

  return <div className="contenedor-Tarjetas">{tarjetas}</div>;
};
