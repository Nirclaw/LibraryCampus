import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { MarvelPages } from "../pages/MarvelPages";
import { DCPages } from "../pages/DCPages";
import { Search } from "../pages/Search";
import { Hero } from "../pages/Hero";
import { Biblioteca } from "../pages/Biblioteca";

export const HeroesRouters = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="marvel" element={<MarvelPages />} />
        <Route path="dc" element={<DCPages />} />
        <Route path="search" element={<Search />} />
        <Route path="hero/:heroId" element={<Hero />} />

        <Route path="/*" element={<Navigate to={"/marvel"} />} />
      </Routes>
    </>
  );
};
