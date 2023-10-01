import { Link } from "react-router-dom";
import { TablaLibrosPrestados } from "../components/TablaLibrosPrestados";
import { useContext, useEffect, useState } from "react";
import { Autchontext } from "../../auth/context/Autchontext";
import { validarToken } from "../helpers/desencriptardata";
import { TablaInfousuario } from "../components/TablaInfousuario";

export const Perfil = () => {
  const { user } = useContext(Autchontext);
  const [usuarioInformaciom, setUsarioInfo] = useState();
  const [nombre, setnombre] = useState();
  const [incial, seinciar] = useState("");

  const [mostrar, setMostar] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener información del usuario
        const userInfo = await validarToken(user.user);
        setUsarioInfo(userInfo[0]);
        setnombre(userInfo[0].nombre_completo);
        seinciar(userInfo[0].nombre_completo)
        // Obtener datos del perfil del usuario
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchUserData();
  }, [user.user]);



  const Onprestamos = async () => {
    setMostar(<TablaLibrosPrestados info={usuarioInformaciom} />);
  };
  const OnPInfoPerfil = async () => {
    setMostar(<TablaInfousuario data={usuarioInformaciom} />);
  };

  return (
    <div className="Contendor-Perfil">
      <div className="contenedor-Foto-perfil">{incial.charAt(0)}</div>
      <div className="contenedor-Nobre-perfil">{nombre}</div>
      <div className="nav-perfil nav justify-content-center">
        <Link
          className="nav-link active"
          aria-current="page"
          onClick={OnPInfoPerfil}
        >
          Información
        </Link>
        <Link
          className="nav-link active"
          aria-current="page"
          onClick={Onprestamos}
        >
          Libros prestados
        </Link>
      </div>

      <div className="contenedor-de-Info">{mostrar}</div>

    </div>
  );
};
