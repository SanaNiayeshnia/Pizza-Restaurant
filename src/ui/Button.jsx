import propTypes from "prop-types";
import { Link } from "react-router-dom";

Button.propTypes = {
  disabled: propTypes.bool,
  children: propTypes.any,
  className: propTypes.string,
  to: propTypes.string,
  onClick: propTypes.func,
};

function Button({ disabled, className, to, onClick, children }) {
  const styles = `bg-amber-400 hover:bg-yellow-400 transition-all duration-300 rounded-full py-2 focus:ring-4 focus:ring-yellow-300 focus:outline-none focus:ring-offset-2 focus:ring-opacity-40 active:bg-yellow-400 px-3 disabled:bg-stone-300 ${className}`;
  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
