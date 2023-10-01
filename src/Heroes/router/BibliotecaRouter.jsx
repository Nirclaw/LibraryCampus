import { Navigate, Route, Routes } from "react-router-dom";
import { Biblioteca } from "../pages/Biblioteca";
import { NavbarBook } from "../../ui/components/NavbarBook";
import { Book } from "../pages/Book";
import { Perfil } from "../pages/Perfil";
import { CategoPage } from "../pages/CategoPage";
import { SearchBook } from "../pages/SearchBook";

export const BibliotecaRouter = () => {
  return (
    <>
      <NavbarBook />

      <Routes>
        <Route path="/inicio" element={<Biblioteca />} />
        <Route path="libro/:titulo" element={<Book />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="categoria/:genero" element={<CategoPage />} />
        <Route path="buscar" element={<SearchBook />} />
        <Route path="/*" element={<Navigate to={"inicio"}/>} />

      </Routes>
    </>
  );
};
