// import MoviesPage from '../../../pages/MoviesPage/MoviesPage';
import css from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchMovie({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <div className={css.wrapper}>
        <input
          type="text"
          className={css.input}
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
