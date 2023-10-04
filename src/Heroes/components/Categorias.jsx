import React from "react";
import { Link } from "react-router-dom";

export const Categorias = ({ categoria }) => {
  return (
    
      <Link className="btn" to={`/categoria/${categoria}`}>{categoria}</Link>
   
  );
};
