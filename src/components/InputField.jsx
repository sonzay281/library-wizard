import React from "react";
/**
 * Controller input field
 * @param id input field unique identifier
 * @param label label to show in the form
 * @param extraClassName extra class names if any to customize the input field
 * @field You may pass other valid input parameters like required,autocomplete, pattern etc. 
 */
const InputField = ({
  id,
  label,
  placeholder,
  extraClassName = "",
  ...rest
}) => {
  return (
    <div className={`form-control ${extraClassName}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className="input-field"
        id={id}
        placeholder={placeholder || label}
        {...rest}
      />
    </div>
  );
};
export default InputField;
