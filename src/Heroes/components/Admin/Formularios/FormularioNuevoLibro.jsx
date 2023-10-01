import React, { useContext, useState } from "react";
import { useForm } from "../../../../auth/hooks/useForms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autchontext } from "../../../../auth/context/Autchontext";

export const FormularioNuevoLibro = () => {
  const navigate = useNavigate();
  const [Enviar, setEnviar] = useState(null);
  const [Error, setError] = useState(null);

  const { user } = useContext(Autchontext);

  const {
    Nuevotitulo,
    NuevoAutor,
    nuevoEditorial,
    NuevoFecha,
    NuevoGenero,
    NuevoIdioma,
    NuevoPaginas,
    NuevoPrecio,
    NuevoSinpsis,
    NuevoLink,
    cantidad,
    cambioEnLaentrada,
    borrar,
  } = useForm({
    Nuevotitulo: "",
    NuevoAutor: "",
    nuevoEditorial: "",
    NuevoFecha: "",
    NuevoGenero: "",
    NuevoIdioma: "",
    NuevoPaginas: "",
    NuevoPrecio: "",
    NuevoSinpsis: "",
    NuevoLink: "",
    cantidad: "",
  });

  const Oncancelar = ()=>{
    navigate(-1)
  }

  const headers = {
    headers: {
      "Accept-version": "1.0.0",
      Authorization: `Bearer ${user.user}`,
    },
  };
  const OnCrear = async () => {
    let NuevaData = {
      titulo: Nuevotitulo,
      autor: NuevoAutor,
      editorial: nuevoEditorial,
      fecha_publicacion: NuevoFecha,
      genero: NuevoGenero,
      idioma: NuevoIdioma,
      paginas: parseInt(NuevoPaginas),
      precio: Number(NuevoPrecio),
      sinopsis: NuevoSinpsis,
      portada: NuevoLink,
      cantidad: parseInt(cantidad),
    };
    try {
      const response = await axios.post(
        `http://127.10.10.10:5100/libro/registrar`,
        NuevaData,
        headers
      );
      const result = response;
      console.log(result);
      if (result.data.status === 200) {
        borrar();
        return setError(
          <div
            className="alert alert-success animate__animated animate__bounceIn"
            role="alert"
          >
            {result.data.message}
          </div>
        );
      }
      {
        return setError(
          <div
            className="alert alert-warning animate__animated animate__bounceIn"
            role="alert"
          >
            {result.data.message.msg
              ? result.data.message.msg
              : `${result.data.message.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description} ejemplo: 1.23`}
          </div>
        );
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  return (
    <div className="Formulario-Crear-libro">
      <input
        className="form-control form-control-lg"
        type="text"
        name="Nuevotitulo"
        value={Nuevotitulo}
        onChange={cambioEnLaentrada}
        placeholder="Titulo"
      />
      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoAutor"
        value={NuevoAutor}
        onChange={cambioEnLaentrada}
        placeholder="Autor"
      />
      <input
        className="form-control form-control-lg"
        type="text"
        name="nuevoEditorial"
        value={nuevoEditorial}
        onChange={cambioEnLaentrada}
        placeholder="Editorial"
      />
      <div className="FECHA">
        <label>Fecha de Publicacion</label>
        <input
          className="form-control form-control-lg"
          type="date"
          value={NuevoFecha}
          onChange={cambioEnLaentrada}
          name="NuevoFecha"
        />
      </div>
      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoGenero"
        value={NuevoGenero}
        onChange={cambioEnLaentrada}
        placeholder="Genero"
      />

      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoIdioma"
        value={NuevoIdioma}
        onChange={cambioEnLaentrada}
        placeholder="Idioma"
      />

      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoPaginas"
        value={NuevoPaginas}
        onChange={cambioEnLaentrada}
        placeholder="Paginas"
      />

      <input
        className="form-control form-control-lg"
        type="number"
        name="NuevoPrecio"
        value={NuevoPrecio}
        onChange={cambioEnLaentrada}
        placeholder="Precio"
      />

      <textarea
        className="form-control form-control-lg"
        name="NuevoSinpsis"
        placeholder="Sinopsis"
        value={NuevoSinpsis}
        onChange={cambioEnLaentrada}
      />
      <input
        className="form-control form-control-lg"
        type="text"
        name="NuevoLink"
        value={NuevoLink}
        onChange={cambioEnLaentrada}
        placeholder="Link Portada"
      />
      <input
        className="form-control form-control-lg"
        type="number"
        name="cantidad"
        value={cantidad}
        onChange={cambioEnLaentrada}
        placeholder="Cantidad"
      />

      <div className="Botones-formulario">
        <button className="btn" onClick={OnCrear}>
          Crear
        </button>
        <button className="btn" onClick={Oncancelar}>Cancelar</button>
      </div>
      <>{Error}</>
    </div>
  );
};
