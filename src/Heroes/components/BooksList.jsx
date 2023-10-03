import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Autchontext } from "../../auth/context/Autchontext"; // Corregir la importación del contexto
import { LibroCards } from "./LibroCards.jsx";

export const BooksList = () => {
  const { user } = useContext(Autchontext);
  const [tarjetas, setTarjetas] = useState([]);
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER)
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
          `http://${url.host}:${url.port}/libro`,
          headers
        );
        const result = response.data.data;
        const tarjetas = result.map((libro) => (
          <LibroCards key={libro.titulo} {...libro} />
        ));
        setTarjetas(tarjetas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); // Agregar dependencia vacía para que useEffect se ejecute una sola vez al montar el componente

  if (tarjetas.length == 0) {
    setTarjetas(
      <div className="cargador">
        {" "}
        <div
          className=" spinner-grow"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return <div className="contenedor-Tarjetas">{tarjetas}</div>;
};
