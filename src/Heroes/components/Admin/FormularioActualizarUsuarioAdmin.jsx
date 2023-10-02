import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../../auth/hooks/useForms";
import { Autchontext } from "../../../auth/context/Autchontext";
import axios from "axios";
import { useParams } from "react-router-dom";

export const FormularioActualizarUsuarioAdmin = () => {
  const { cc } = useParams();

  const {
    NuevoNombre,
    NuevoEdad,
    NuevoSexo,
    NuevoRol,
    NuevoContrasena,
    cambioEnLaentrada,
  } = useForm({
    NuevoNombre: "",
    NuevoEdad: "",
    NuevoSexo: "",
    NuevoRol: "",
    NuevoContrasena: "",
  });

  const { user } = useContext(Autchontext);
  const [dataPerfil, setdataPerfil] = useState(null);
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
          `http://127.10.10.10:5100/usuario/${cc}`,
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
  }, []);

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
  }

  const OnGuardar = () => {
    console.log(dataPerfil);
  };

  const Oncancelar = () => {};
  return (
    <div className="Formulario-Crear-libro">
      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoNombre"
        value={NuevoNombre}
        onChange={cambioEnLaentrada}
        placeholder={dataPerfil.nombre_completo}
      />
      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoEdad"
        value={NuevoEdad}
        onChange={cambioEnLaentrada}
        placeholder={dataPerfil.edad}
      />
      <select
        className="form-control form-control-lg"
        type="text"
        name="NuevoSexo"
        value={NuevoSexo}
        onChange={cambioEnLaentrada}
      >
        <option value="Homber">Homber</option>
        <option value="Mujer">Mujer</option>
        <option value="LGBTQI">LGBTQI+</option>
      </select>
      <select
        className="form-control form-control-lg"
        type="text"
        name="NuevoRol"
        value={NuevoRol}
        onChange={cambioEnLaentrada}
        placeholder={dataPerfil.rol}
      >
        <option value="user" defaultValue={true}>
          User
        </option>
        <option value="admin">Admin</option>
      </select>
      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoContrasena"
        value={NuevoContrasena}
        onChange={cambioEnLaentrada}
        placeholder={dataPerfil.contrasena}
      />

      <div className="Botones-formulario">
        <button className="btn" onClick={OnGuardar}>
          Guardar
        </button>
        <button className="btn" onClick={Oncancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
