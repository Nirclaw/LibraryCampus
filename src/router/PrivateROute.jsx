import { useContext } from "react";
import { Autchontext } from "../auth/context/Autchontext";
import { Navigate } from "react-router-dom";

export const PrivateROute = ({ children }) => {
  const { logged } = useContext(Autchontext);
  return logged ? children : <Navigate to={"/login"} />;
};
