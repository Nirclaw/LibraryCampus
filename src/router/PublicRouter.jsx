import { useContext } from "react";
import { Autchontext } from "../auth/context/Autchontext";
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children }) => {
    const { logged } = useContext(Autchontext);
  
    return !logged ? children : <Navigate to={"/biblioteca"} />;
  };