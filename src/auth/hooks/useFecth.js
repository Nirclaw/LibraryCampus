import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url, body={}) => {
  const [stado, setStado] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  const getFetch = async () => {
    try {
      setStado({
        ...stado,
        isLoading: true,
      });

      const response = await axios.post(url, body);

      setStado({
        data: response.data, // Actualiza el estado con los datos de la respuesta
        isLoading: false,
        error: null,
      });
      
    } catch (error) {
      setStado({
        data: null,
        isLoading: false,
        error: error.message, // Captura y almacena el error si la solicitud falla
      });
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: stado.data,
    isLoading: stado.isLoading,
    error: stado.error,
  };
};
