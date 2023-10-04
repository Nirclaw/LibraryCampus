import { heroes } from "../Data/Heroes";

export const getHeroesByPublisher = (publisher) => {
  const validar = ["DC Comics", "Marvel Comics"];

  if (!validar.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`);
  }

  return heroes.filter((heroe) => heroe.publisher === publisher);
};
