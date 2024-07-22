import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../movies-api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    async function fetchReviews() {
      try {
        const data = await getMovieReview(movieId);
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!reviews.length) return <div>No reviews information available</div>;

  return (
    <div>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <p className={css.author}>
              <strong>Author: {review.author}</strong>
            </p>
            <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
