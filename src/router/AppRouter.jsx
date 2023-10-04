import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPages } from "../auth/pages/LoginPages";
import { PrivateROute } from "./PrivateROute";
import { PublicRouter } from "./PublicRouter";
import { RegisterPages } from "../auth/pages/RegisterPages";
import { BibliotecaRouter } from "../Heroes/router/BibliotecaRouter";
import { PrivateRouterAdmin } from "./PrivateRouterAdmin";
import { AdminRouter } from "./AdminRouter";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRouter>
              <LoginPages />
            </PublicRouter>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouter>
              <RegisterPages />
            </PublicRouter>
          }
        />

        <Route
          path="/biblioteca/*"
          element={
            <PrivateROute>
              <BibliotecaRouter />
            </PrivateROute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <PrivateRouterAdmin>
              <AdminRouter />
            </PrivateRouterAdmin>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateROute>
              <BibliotecaRouter />
            </PrivateROute>
          }
        />
      </Routes>
    </>
  );
};
