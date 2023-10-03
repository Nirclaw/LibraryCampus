import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Autchontext } from "../../auth/context/Autchontext";
import { MenuCategorias } from "../../Heroes/components/MenuCategorias";
import { validarToken } from "../../Heroes/helpers/desencriptardata";
export const NavbarBook = () => {
  const navigate = useNavigate();
  const [usuarioInformaciom, setUsarioInfo] = useState({});

  const { user, logout } = useContext(Autchontext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await validarToken(user.user);
        setUsarioInfo(userInfo.rol);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchUserData();
  }, [user.user]);

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
  const onPerfil = () => {
    navigate("/perfil", {
      replace: true,
    });
  };

  const OnSearch = () => {
    navigate("/buscar", {
      replace: true,
    });
  };

  const OnAdmin = () => {
    navigate("/admin", {
      replace: true,
    });
  };

  return (
    <div className="navbar text-bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="" onClick={OnHome}>
          Library Campus lands
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
              <li className="btn nav-item" onClick={OnHome}>
                <button className=" nav-link active">INICIO</button>
              </li>
              <li className="btn" onClick={OnSearch}>
                <button className="bnt nav-link active">BUCAR</button>
              </li>
              <li className="btn" onClick={onPerfil}>
                <button className="nav-link active ">PERFIL</button>
              </li>

              <li className="btn dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Generos
                </a>
                <ul className=" dropdown-menu">
                  <MenuCategorias />
                </ul>
              </li>

              {usuarioInformaciom === "admin" ? (
                <li className="btn nav-item" onClick={OnAdmin}>
                  <a className="nav-link active" href="">
                    ADMIN
                  </a>
                </li>
              ) : (
                <></>
              )}

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
