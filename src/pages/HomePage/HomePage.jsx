import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { getTrendedMovies } from "../../movies-api.js";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getTrendedMovies();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className={css.title}>Trending Today</h2>
      <MovieList movies={movies} />
    </div>
  );
}
