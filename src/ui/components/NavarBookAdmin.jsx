import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autchontext } from "../../auth/context/Autchontext";
import { MenuCategorias } from "../../Heroes/components/MenuCategorias";
export const NavarBookAdmin = () => {
  const navigate = useNavigate();

  const { logout } = useContext(Autchontext);

  const OnLogout = () => {
    navigate("/login", {
      replace: true,
    });
    logout();
  };
  const OnHome = () => {
    navigate("/biblioteca", {
      replace: true,
    });
  };
  const OnActualizar = () => {
    navigate("actualizar/libro", {
      replace: true,
    });
  };

  const OnActualizarUsuario = () => {
    navigate("actualizar/usuario", {
      replace: true,
    });
  };

  const OnAgregarNuevoLibro = () => {
    navigate("insertar/NuevoLibro", {
      replace: true,
    });
  };
  const OnAdmin = () => {
    navigate("/biblioteca", {
      replace: true,
    });
  };

  return (
    <div className="navbar text-bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="" onClick={OnHome}>
          Library Campus lands ADMIN
        </a>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="btn nav-item" onClick={OnAgregarNuevoLibro}>
                <button className=" nav-link active">
                  AGREGAR NUEVO LIBRO
                </button>
              </li>
              <li className="btn" onClick={OnActualizar}>
                <button className="bnt nav-link active">
                  ACTUALIZAR UN LIBRO
                </button>
              </li>
              <li className="btn" onClick={OnActualizarUsuario}>
                <button className="nav-link active ">ACTUALIZAR USUARIO</button>
              </li>

              <li className="btn dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mas
                </a>
                <ul className=" dropdown-menu">
                  <MenuCategorias />
                </ul>
              </li>
              <li className="btn nav-item" onClick={OnAdmin}>
                <a className="nav-link active" href="">
                  VOLVER
                </a>
              </li>

              <li className="btn nav-item" onClick={OnLogout}>
                <a className="nav-link active" href="">
                  Salir
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
