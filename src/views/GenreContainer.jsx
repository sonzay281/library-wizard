import React from "react";
import { useDispatch } from "react-redux";

import Button from "components/Button";

import { valueChanged } from "actions/baseActions";

const GenreContainer = ({ form, genres = [] }) => {
  const dispatch = useDispatch();

  const handleGenreSelect = (value) => {
    dispatch(valueChanged("form.genre", value));
  };

  return (
    <div className="list-container">
      {genres?.map(({ id, name }) => (
        <Button
          extraClassName={`btn-lg ${form?.genre === id ? "active" : ""}`}
          label={name}
          key={`button-index-${id}`}
          onClick={(_) => handleGenreSelect(id)}
        />
      ))}
    </div>
  );
};
export default GenreContainer;
