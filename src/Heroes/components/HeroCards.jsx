import { Link } from "react-router-dom";

export const HeroCards = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImagen = `/assets/heroes/${id}.jpg`;
  return (
    <div className="col">
      <div className="card ">
        <div className="row no-gutter">
          <div className="col-4">
            <img src={heroImagen} className="card-img " alt={superhero} />{" "}
          </div>

          <div className="col-8">
            <h5 className="card-title">{superhero}</h5>
            <p>{alter_ego}</p>
            {alter_ego !== characters && <p>{characters}</p>}
            <p className="card-text">
              <small className="text-muted">{first_appearance}</small>
            </p>

            <Link className="btn btn-primary" to={`/hero/${id}`}>
              mas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
