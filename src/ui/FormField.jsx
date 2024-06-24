import propTypes from "prop-types";
FormField.propTypes = {
  label: propTypes.string,
  htmlFor: propTypes.string,
  children: propTypes.any,
  className: propTypes.string,
};

function FormField({ label, htmlFor, className, children }) {
  return (
    <div className={`grid items-center gap-2 ${className}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export default FormField;
