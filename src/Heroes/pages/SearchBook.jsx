import { LibroCards } from "../components/LibroCards";
import { useForm } from "../../auth/hooks/useForms";
import axios from "axios";
import { useContext, useState } from "react";
import { Autchontext } from "../../auth/context/Autchontext";
import { OptionAutocomplete } from "../components/OptionAutocomplete";

export const SearchBook = () => {
  const url = JSON.parse(import.meta.env.VITE_MY_SERVER)

  const { user } = useContext(Autchontext);

  const { buscador, cambioEnLaentrada } = useForm({
    buscador: "",
  });

  const [titulos, setTitulos] = useState([]);

  const [Libro, setLibro] = useState({
    Libro: false,
  });
  [];
  const [mostrar, setmostrar] = useState({
    mostrar: true,
  });

  const onSearch = async (eve) => {
    eve.preventDefault();
    if (buscador.length > 0) {
      const headers = {
        headers: {
          "Accept-version": "1.0.0",
          Authorization: `Bearer ${user.user}`,
        },
      };

      const data = await axios.get(
        `http://${url.host}:${url.port}/libro/${buscador}`,
        headers
      );
      if (data.data.data !== null) {
        setLibro(data.data.data);
        setmostrar(false);
      }
    }
  };

  const OnClinINput = async () => {
    const headers = {
      headers: {
        "Accept-version": "1.0.0",
        Authorization: `Bearer ${user.user}`,
      },
    };
    const titulosUnicos = await axios.get(
      `http://${url.host}:${url.port}/libro/todainfo`,
      headers
    );
    const data = titulosUnicos.data;
    const Autocompleto = data.map((titulo) => (
      <OptionAutocomplete key={titulo} titulo={titulo} />
    ));

    setTitulos(Autocompleto);
  };

  return (
    <div className="contenedor-buscador">
      <div className="contenedor-Barrabusqueda">
        <div className="input-container">
          <input
            type="text"
            name="buscador"
            id="buscador"
            className="input"
            placeholder="Digite el libro que desea buscar"
            value={buscador}
            onChange={cambioEnLaentrada}
            onClick={OnClinINput}
            list="datalistOptions"
          />
          <datalist id="datalistOptions">{titulos}</datalist>
          <div className="highlight"></div>
        </div>
        <button className="btn" onClick={onSearch}>
          Buscar
        </button>
      </div>
      <div className="contenedor-resultado">
        {mostrar !== false ? (
          <div></div>
        ) : (
          <LibroCards
            className="accordion-animated"
            titulo={Libro.titulo}
            genero={Libro.genero}
            portada={Libro.portada}
            sinopsis={Libro.sinopsis}
          />
        )}
      </div>
    </div>
  );
};
