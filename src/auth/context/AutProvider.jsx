import React, { useReducer } from "react";
import { Autchontext } from "./Autchontext";
import { autReducer } from "./autReducer";
import { types } from "../types/types";

const initianalState = {
  logged: false,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user: user,
  };
};

export const AutProvider = ({ children }) => {
  const [autState, dispatch] = useReducer(autReducer, initianalState, init);

  
  const login = async (user = {}) => {
    const usuario = { id: "abc", user };
    const action = {
      type: types.login,
      payload: usuario,
    };
    localStorage.setItem("user", JSON.stringify(usuario.user));
    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem("user");
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <Autchontext.Provider value={{ ...autState, login, logout }}>
      {children}
    </Autchontext.Provider>
  );
};
