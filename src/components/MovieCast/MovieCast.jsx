import { useEffect, useState } from "react";
import { getMovieCast } from "../../movies-api.js";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoader(true);
    async function fetchCast() {
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
        setLoader(false);
      } catch (error) {
        setError(error.message);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    }
    fetchCast();
  }, [movieId]);

  if (loader) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cast.length) return <div>No cast information available</div>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={css.listItem}>
          <img
            className={css.itemImg}
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
          />
          <p className={css.castName}>{actor.name}</p>
          <p className={css.castCharacter}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
