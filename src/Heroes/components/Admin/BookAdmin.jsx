import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../../auth/hooks/useForms";
import axios from "axios";
import { validarToken } from "../../helpers/desencriptardata";
import SuccessNotification from "../SuccessNotification";
import { Autchontext } from "../../../auth/context/Autchontext";

export const BookAdmin = () => {
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER)

  const navigate = useNavigate();
  const [Error, setError] = useState(null);
  const { user } = useContext(Autchontext);
  const { titulo } = useParams();
  const [info, setinfo] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [usarioInfo, setUsarioInfo] = useState(null);
  const [Enviar, setEnviar] = useState(null);
  const {
    Nuevotitulo,
    NuenoAutor,
    nuevoEditorial,
    NuevoFecha,
    NuevoGenero,
    NuevoIdioma,
    NuevoPaginas,
    NuevoPrecio,
    NuevoSinpsis,
    NuevoLink,
    cambioEnLaentrada,
    borrar
  } = useForm({
    Nuevotitulo: "",
    NuenoAutor: "",
    nuevoEditorial: "",
    NuevoFecha: "",
    NuevoGenero: "",
    NuevoIdioma: "",
    NuevoPaginas: "",
    NuevoPrecio: "",
    NuevoSinpsis: "",
    NuevoLink: "",
  });
  let NuevaData = {
    _id: "",
    titulo: Nuevotitulo,
    autor: NuenoAutor,
    editorial: nuevoEditorial,
    fecha_publicacion: NuevoFecha,
    genero: NuevoGenero,
    idioma: NuevoIdioma,
    paginas: parseInt(NuevoPaginas),
    precio: Number(NuevoPrecio),
    sinopsis: NuevoSinpsis,
    portada: NuevoLink,
    cantidad: 0,
  };
  const headers = {
    headers: {
      "Accept-version": "1.0.0",
      Authorization: `Bearer ${user.user}`,
    },
  };
  const closeSuccessNotification = () => {
    setShowSuccessNotification(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${url.host}:${url.port}/libro/${titulo}`,
          headers
        );
        const result = response.data.data;
        setinfo(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();

    const obtenerUsarioInfo = async () => {
      const usuarioInfo = await validarToken(user.user);
      setUsarioInfo(usuarioInfo);
    };

    obtenerUsarioInfo();
  }, [titulo, user.user]);

  const Onguardar = async () => {
    function copiarValoresVacios(origen, destino) {
      for (const key in origen) {
        if (origen.hasOwnProperty(key) && destino[key] === "") {
          destino[key] = origen[key];
        }
      }
    }
    copiarValoresVacios(info, NuevaData);
    try {
      const result = await axios.put(
        `http://${url.host}:${url.port}/libro/actualizar`,
        NuevaData,
        headers
      );
      if (result.data.status === 200) {
        console.log(result.data.message.errInfo ? alert("Error en los datos escritos ") : alert(result.data.message));

      }
      ///alert(result.data.message.msg);
      // if (result.data.status === 200) {
      //   setEnviar(result)
      // } else {
      //   (result.data.message.msg ? alert(result.data.message.msg) : alert(result.data.message.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description))
      // }

    } catch (error) {
      alert("Error en los datos porporciados");
    }
  };

  const OnNavigateBack = () => {
    navigate(-1);
  };

  if (!info) {
    return navigate(-1);
  }
  return (
    <>
      {" "}
      <div className="contnedor-portada">
        <div className="portada-imagen">
          <img
            src={info.portada}
            alt=""
            className="img-thumbnail animate__animated animate__bounceIn"
          />
        </div>
        <div className="contenedor-info">
          <h3 className="contenedor-titulo">
            <input
              placeholder={info.titulo}
              name="Nuevotitulo"
              id="Nuevotitulo"
              value={Nuevotitulo}
              onChange={cambioEnLaentrada}
            />
          </h3>
          <ul className="contenerdor-mas-info">
            <li>
              <b>{"Autor:  "}</b>
              <input
                placeholder={info.autor}
                name="NuenoAutor"
                value={NuenoAutor}
                onChange={cambioEnLaentrada}
              />
            </li>
            <li>
              <b>{"Editorial:  "}</b>
              <input
                placeholder={info.editorial}
                name="nuevoEditorial"
                value={nuevoEditorial}
                onChange={cambioEnLaentrada}
              />
            </li>
            <li>
              <b>{"Fecha de publicacion:  "}</b>
              <input
                placeholder={new Date(
                  info.fecha_publicacion
                ).toLocaleDateString()}
                name="NuevoFecha"
                value={NuevoFecha}
                onChange={cambioEnLaentrada}
                type="date"
              />
            </li>

            <li>
              <b>{"Genero:  "}</b>
              <input
                placeholder={info.genero}
                name="NuevoGenero"
                onChange={cambioEnLaentrada}
                value={NuevoGenero}
              />
            </li>

            <li>
              <b>{"Idioma:  "}</b>
              <input
                placeholder={info.idioma}
                name="NuevoIdioma"
                onChange={cambioEnLaentrada}
                value={NuevoIdioma}
              />
            </li>
            <li>
              <b>{"Paginas:  "}</b>
              <input
                placeholder={info.paginas}
                name="NuevoPaginas"
                onChange={cambioEnLaentrada}
                value={NuevoPaginas}
                type="number"
              />
            </li>
            <li>
              <b>{"Precio:  "}</b>
              <input
                placeholder={info.precio}
                name="NuevoPrecio"
                onChange={cambioEnLaentrada}
                value={NuevoPrecio}
              />
            </li>
            <li>
              <b>{"Portada:  "}</b>
              <input
                placeholder={info.portada}
                name="NuevoLink"
                onChange={cambioEnLaentrada}
                value={NuevoLink}
              />
            </li>
            <li>
              <b>{"Cantidad:  "}</b>
              {info.cantidad}
            </li>
          </ul>
          <h3 className="contendor-sinopsis">
            <p className="contendor-textosinpsis">
              <textarea
                className="input"
                placeholder={info.sinopsis}
                value={NuevoSinpsis}
                name="NuevoSinpsis"
                onChange={cambioEnLaentrada}
              />
            </p>
          </h3>

          <div className="contenedor-botones">
            <button
              className="btn"
              onClick={OnNavigateBack}
              style={{ gridColumn: "1" }}
            >
              Cancelar
            </button>
            <button className="btn " onClick={Onguardar}>
              Guardar
            </button>
            {showSuccessNotification && (
              <SuccessNotification
                onClose={closeSuccessNotification}
                info={respuesta}
              />
            )}
          </div>
          <>{Error}</>

        </div>
      </div>
    </>
  );
};
