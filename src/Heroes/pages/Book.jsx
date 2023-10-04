import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Autchontext } from "../../auth/context/Autchontext";
import axios from "axios";
import SuccessNotification from "../components/SuccessNotification";
import { useForm } from "../../auth/hooks/useForms";
import { validarToken } from "../helpers/desencriptardata";

export const Book = () => {
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER);

  const navigate = useNavigate();
  const { user } = useContext(Autchontext);
  const { titulo } = useParams();
  const [info, setinfo] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [usarioInfo, setUsarioInfo] = useState(null);
  const { fecha, cambioEnLaentrada } = useForm({
    fecha: "",
  });

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

  const Onprestar = async () => {
    try {
      const data = await axios.post(
        `http://${url.host}:${url.port}/libro/prestamoLibro`,
        {
          cc: usarioInfo.cc,
          devolucion: fecha,
          titulo: titulo,
        },
        headers
      );
      setRespuesta(data);
      setShowSuccessNotification(true);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  const OnNavigateBack = () => {
    navigate(-1);
  };
  return (
    <>
      {" "}
      <div className="contnedor-portada">
     <div className="centrar-contenido">
     <div className="portada-imagen">
          <img
            src={info.portada}
            alt=""
            className="img-thumbnail animate__animated animate__bounceIn"
          />
        </div>
        <div className="contenedor-info">
          <h3 className="contenedor-titulo">{info.titulo}</h3>
          <ul className="contenerdor-mas-info">
            <li>
              <b>{"Autor:  "}</b>
              {info.autor}
            </li>
            <li>
              <b>{"Editorial:  "}</b>
              {info.editorial}
            </li>
            <li>
              <b>{"Fecha de publicacion:  "}</b>
              {new Date(info.fecha_publicacion).toLocaleDateString()}
            </li>

            <li>
              <b>{"Genero:  "}</b>
              {info.genero}
            </li>

            <li>
              <b>{"Idioma:  "}</b>
              {info.idioma}
            </li>
            <li>
              <b>{"Paginas:  "}</b>
              {info.paginas}
            </li>
            <li>
              <b>{"Precio:  "}</b>
              {info.precio}
            </li>
            <li>
              <b>{"Cantidad:  "}</b>
              {info.cantidad}
            </li>
          </ul>
          <h3 className="contendor-sinopsis">
            <p className="contendor-textosinpsis">{info.sinopsis}</p>
          </h3>

          <div className="contenedor-botones">
            <label className="contendor-mensaje">
              Elija la fecha de devolucion:{" "}
            </label>
            <input
              className="btn"
              type="date"
              name="fecha"
              id="fecha"
              value={fecha}
              onChange={cambioEnLaentrada}
              style={{ gridColumn: "1/3" }}
            />
            <button
              className="btn"
              onClick={OnNavigateBack}
              style={{ gridColumn: "1" }}
            >
              Regresar
            </button>

            <button className="btn " onClick={Onprestar}>
              Prestar
            </button>
            {showSuccessNotification && (
              <SuccessNotification
                onClose={closeSuccessNotification}
                info={respuesta}
              />
            )}
          </div>
        </div>
      </div>
     </div>
        
    </>
  );
};
