import React from "react";
import { useDispatch } from "react-redux";

import InputField from "components/InputField";

import { valueChanged } from "actions/baseActions";

const AddSubGenreContainer = ({ subgenre }) => {
  const dispatch = useDispatch();
  const handleChange = ({ target: { type, id, value, checked } }) => {
    dispatch(
      valueChanged(`form.subgenre.${id}`, type === "checkbox" ? checked : value)
    );
  };

  return (
    <div className="sub-genre-form-container p-1">
      <InputField
        id="name"
        placeHolder="Subgenre name"
        onChange={handleChange}
        required
        value={subgenre?.name}
      />
      <div className="form-control  my-2">
        <input
          type="checkbox"
          id="isDescriptionRequired"
          checked={subgenre?.isDescriptionRequired}
          onChange={handleChange}
        />
        <label htmlFor="isDescriptionRequired">
          Description is required for this subgenre
        </label>
      </div>
    </div>
  );
};

export default AddSubGenreContainer;
