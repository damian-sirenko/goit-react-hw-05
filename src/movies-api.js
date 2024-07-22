import axios from "axios";

const trendingUrl =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const movieDetailsUrl = "https://api.themoviedb.org/3/movie";
const searchUrl = "https://api.themoviedb.org/3/search/movie";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjE2MDBjMmExY2YyNDZlY2I2OWY1MzgxM2I0NGUwYiIsIm5iZiI6MTcyMTA1NDk2MS42MjYzMTgsInN1YiI6IjY2OTUzNTA1NDhlY2JmZjQ1ZTJiNTkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xj6TIdCJF3uxWN1Q856yOqWrNDHDgcrJWM7GOm2AwFo",
    accept: "application/json",
  },
};

export const getTrendedMovies = async () => {
  try {
    const { data } = await axios.get(trendingUrl, options);
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const { data } = await axios.get(`${movieDetailsUrl}/${id}`, options);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCast = async (id) => {
  try {
    const { data } = await axios.get(
      `${movieDetailsUrl}/${id}/credits`,
      options
    );
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie cast data:", error);
    throw error;
  }
};

export const getMovieReview = async (id) => {
  try {
    const { data } = await axios.get(
      `${movieDetailsUrl}/${id}/reviews`,
      options
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching movie cast data:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(`${searchUrl}?query=${query}`, options);
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
