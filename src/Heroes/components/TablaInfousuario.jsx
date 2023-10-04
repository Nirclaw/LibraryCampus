import React, { useState } from "react";

export const TablaInfousuario = ({ data }) => {

  if (!data) {
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
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">CC</th>
          <th scope="col">Edad</th>
          <th scope="col">Sexo</th>
          <th scope="col">deuda</th>
          <th scope="col">Rol</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        <tr>
          <td>{data.cc}</td>
          <td>{data.edad}</td>
          <td>{data.sexo}</td>
          <td>${data.deuda}</td>
          <td>{data.rol}</td>
        </tr>
      </tbody>
    </table>
  );
};
