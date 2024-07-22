import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const goBackPath = location?.state?.from ?? "/";

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setLoader(false);
      } catch (error) {
        setError(error.message);
        setLoader(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  if (loader) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className={css.container}>
      <GoBackButton path={goBackPath}>Go Back</GoBackButton>
      <div className={css.detailsWrapper}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h3 className={css.title}>{movie.title}</h3>
          <p className={css.score}>User Score: {movie.vote_average * 10}%</p>
          <h4 className={css.titleOverview}>Overview</h4>
          <p className={css.overview}>{movie.overview}</p>
          <h4 className={css.genres}>Genres</h4>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={css.grad}></div>
      <div className={css.info}>
        <p className={css.text}>Additional information</p>
        <ul className={css.list}>
          <li>
            <NavLink className={css.castItem} to="cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={css.reviewItem} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
        <div className={css.grad}></div>
        <Outlet />
      </div>
    </div>
  );
}
