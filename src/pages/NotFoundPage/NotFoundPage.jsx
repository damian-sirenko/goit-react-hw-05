import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
