import React from "react";
import { getHeroesByPublisher } from "../helpers/getHeroesByPublisher.js";
import { HeroCards } from "./HeroCards.jsx";

export const HeroList = ({ publisher }) => {
  const heroes = getHeroesByPublisher(publisher);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCards key={hero.id} {...hero} />
      ))}
    </div>
  );
};
