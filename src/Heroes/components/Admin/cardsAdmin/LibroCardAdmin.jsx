import React from "react";
import { Link } from "react-router-dom";

export const LibroCardAdmin = ({ titulo, genero, sinopsis, portada }) => {
  return (
    <article className="card-book">
      <div className="card-int">
        <span className="card__span">{genero}</span>
        <img className="img-card" src={portada} alt=""></img>
        <div className="card-data">
          <p className="title-card">{titulo}</p>
          <p>{sinopsis}</p>

          <Link className="btn" to={`/admin/libro/${titulo}`}>
            Editar
          </Link>
        </div>
      </div>
    </article>
  );
};
