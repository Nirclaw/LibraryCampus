import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../../auth/hooks/useForms";
import { Autchontext } from "../../../auth/context/Autchontext";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";

export const FormularioActualizarUsuarioAdmin = () => {
  const navigate = useNavigate();

  const { cc } = useParams();
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER);
  const { user } = useContext(Autchontext);
  const [dataPerfil, setdataPerfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Enviar, setEnviar] = useState(null);
  const [Error, setError] = useState(false);
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

  let NuevaData = {
    cc: "",
    nombre_completo: NuevoNombre,
    edad: NuevoEdad,
    sexo: NuevoSexo,
    rol: NuevoRol,
    contrasena: NuevoContrasena,
  };
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
          `http://${url.host}:${url.port}/usuario/${cc}`,
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

  const OnGuardar = async () => {
    function copiarValoresVacios(origen, destino) {
      for (const key in origen) {
        if (origen.hasOwnProperty(key) && destino[key] === "") {
          destino[key] = origen[key];
        }
      }
    }
    copiarValoresVacios(dataPerfil, NuevaData);

    try {
      const response = await axios.put(
        `http://${url.host}:${url.port}/usuario/actualizar`,
        NuevaData,
        headers
      );
      const result = response.data;

      if (result.status === 200) {
        setEnviar(result.message);
        setError(true);
      } else {
        setEnviar(result.message.msg);
        setError(true);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const Oncancelar = () => {
    navigate(-1)
  };
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
        type="number"
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
          Volver
        </button>
      </div>
      <div>
        {Error === true ? (
          <div
            className={
              Enviar.status === 200
                ? "alert alert-success"
                : "alert alert-danger"
            }
            role="alert"
          >
            {Enviar}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
