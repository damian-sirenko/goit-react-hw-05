import { Link } from "react-router-dom";
import css from "./GoBackButton.module.css";

export const GoBackButton = ({ path, children }) => {
  return (
    <Link className={css.link} to={path}>
      {children}
    </Link>
  );
};
