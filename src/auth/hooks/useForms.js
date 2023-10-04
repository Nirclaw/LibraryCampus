import { useState } from "react";

export const useForm = (valorinicial = {}) => {
  /* {
        username: "",
        email: "",
        password: "",
      } */
  const [form, setform] = useState(valorinicial);

  const cambioEnLaentrada = ({ target }) => {
    const { name, value } = target;
    setform({
      ...form,
      [name]: value,
    });
  };

  const borrar = () => {
    setform(valorinicial);
  };
  return {
    ...form,
    borrar,
    form,
    cambioEnLaentrada,
  };
};
