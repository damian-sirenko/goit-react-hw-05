import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchMovie from "../../components/SearchBar/SearchBar.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { searchMovies } from "../../movies-api.js";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    if (!query) return;
    async function fetchMovies() {
      try {
        const data = await searchMovies(query);
        setMovies(data);
        setLoader(false);
      } catch (error) {
        setError(error.message);
        setLoader(false);
      }
    }
    fetchMovies();
  }, [searchParams]);

  const handleSearch = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div className={css.wrapper}>
      <SearchMovie onSearch={handleSearch} />
      {loader && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <MovieList movies={movies} />
    </div>
  );
}
