import { heroes } from "../Data/Heroes";

export const getHeroById = (heroId) => {
  return heroes.find((hero) => hero.id === heroId);
};
