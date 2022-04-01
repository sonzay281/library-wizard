import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Button";

import useGenre from "hooks/useGenre";
import { valueChanged } from "actions/baseActions";

const SubGenreContainer = (_) => {
  const dispatch = useDispatch();
  const { getSubGenreByGenreId } = useGenre();
  const form = useSelector((state) => state.base?.get("form"))?.toJS();

  const handleSubGenreSelect = (value) => {
    dispatch(valueChanged("form", { genre: form?.genre, subgenre: value }));
  };

  const handleNewSubGenreSelect = (_) => {
    dispatch(
      valueChanged("form", { genre: form?.genre, addingNewSubGenre: true })
    );
  };

  const subGenre = getSubGenreByGenreId(form?.genre);

  return (
    <div className="list-container">
      {subGenre?.map(({ id, name }) => (
        <Button
          extraClassName={`btn-lg ${form?.subgenre === id ? "active" : ""}`}
          label={name}
          key={`button-index-${id}`}
          onClick={(_) => handleSubGenreSelect(id)}
        />
      ))}
      <Button
        extraClassName={`btn-lg ${form?.addingNewSubGenre ? "active" : ""}`}
        label="Add new"
        onClick={handleNewSubGenreSelect}
      />
    </div>
  );
};
export default SubGenreContainer;
