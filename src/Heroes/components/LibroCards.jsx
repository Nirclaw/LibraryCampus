import React from "react";
import { Link } from "react-router-dom";

export const LibroCards = ({ titulo, genero, sinopsis, portada }) => {
  return (
    <article className="card-book">
      <div className="card-int">
        <span className="card__span">{genero}</span>
        <img
          className="img-card"
          src={portada}
          alt=""
        ></img>
        <div className="card-data">
          <p className="title-card">{titulo}</p>
          <p>{sinopsis}</p>

          <Link className="btn" to={`/libro/${titulo}`}>
            Mas info
          </Link>
        </div>
      </div>
    </article>
  );
};
