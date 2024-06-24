import propTypes from "prop-types";
InputBox.propTypes = {
  name: propTypes.string,
  type: propTypes.string,
  id: propTypes.string,
  required: propTypes.bool,
  placeholder: propTypes.string,
  className: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

function InputBox({
  type,
  name,
  id,
  required = false,
  placeholder,
  className,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-xl px-2 py-1 shadow-md transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40 ${className} `}
    />
  );
}

export default InputBox;
