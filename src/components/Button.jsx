import React from "react";

import Loading from "./Loading";
/**
 * Reusable Button component which takes
 * @param id button unique identifier
 * @param label label to show in the button
 * @param extraClassName extra class names if any to customize the button
 * @field You may also pass any other valid input parameters . 
 */
const Button = ({
  id,
  label,
  loading = false,
  extraClassName = "",
  ...rest
}) => {
  return (
    <button type="button" className={`btn ${extraClassName}`} {...rest}>
      {label} {loading ? <Loading /> : null}
    </button>
  );
};
export default Button;
