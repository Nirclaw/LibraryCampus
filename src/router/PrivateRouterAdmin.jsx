import { useContext, useEffect, useState } from "react";
import { Autchontext } from "../auth/context/Autchontext";
import { validarToken } from "../Heroes/helpers/desencriptardata";
import { Navigate } from "react-router-dom";

export const PrivateRouterAdmin = ({ children }) => {
  const { user } = useContext(Autchontext);
  const [usuarioInformaciom, setUsarioInfo] = useState({});
  if (user === null) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener información del usuario
        const userInfo = await validarToken(user.user);
        setUsarioInfo(userInfo);
        // Obtener datos del perfil del usuario
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchUserData();
  }, [user.user]);

  const isAdmin = usuarioInformaciom.rol;
  return <div>{isAdmin === "admin" ? children : <p>no es admin</p>}</div>;
};
