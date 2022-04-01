import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useGenre from "hooks/useGenre";

import InputField from "components/InputField";

import { valueChanged } from "actions/baseActions";

const BookForm = () => {
  const dispatch = useDispatch();
  const { getSubgenreDetailById } = useGenre();
  const form = useSelector((state) => state.base.get("form"))?.toJS();

  const subgenreDetail = getSubgenreDetailById(form?.genre, form?.subgenre);

  const handleChange = ({ target: { type, id, value, checked } }) => {
    dispatch(valueChanged(`form.${id}`, type === "checkbox" ? checked : value));
  };

  return (
    <div className="book-form-container">
      <InputField
        label={
          <span>
            Book title <span className="error">*</span>
          </span>
        }
        id="title"
        onChange={handleChange}
        value={form?.title}
        extraClassName="d-block"
        placeholder="Book title"
        required
      />
      <InputField
        label="Author"
        id="author"
        onChange={handleChange}
        value={form?.author}
        extraClassName="d-block"
        list="authors"
      />
      <datalist id="authors">
        {Array(3)
          .fill(0)
          .map((a, idx) => (
            <option key={idx} value={`Author ${idx}`}>{`Author ${idx}`}</option>
          ))}
      </datalist>
      <InputField
        label="ISBN"
        id="isbn"
        onChange={handleChange}
        value={form?.isbn}
        extraClassName="d-block"
      />
      <InputField
        label="Publisher"
        id="publisher"
        onChange={handleChange}
        value={form?.publisher}
        extraClassName="d-block"
        list="publishers"
      />
      <datalist id="publishers">
        {Array(3)
          .fill(0)
          .map((a, idx) => (
            <option
              key={idx}
              value={`Publishers ${idx}`}
            >{`Publishers ${idx}`}</option>
          ))}
      </datalist>
      <div className="form-control d-block">
        <label htmlFor="publishedDate">Published Date</label>
        <input type="date" id="publishedDate" onChange={handleChange} />
      </div>
      <div className="form-control">
        <InputField
          label="Number of Pages"
          id="numberOfPages"
          onChange={handleChange}
          value={form?.numberOfPages}
          extraClassName="d-block pr-1"
          type="number"
        />

        <InputField
          label="Format"
          id="format"
          onChange={handleChange}
          value={form?.format}
          extraClassName="d-block"
          list="formats"
        />
        <datalist id="formats">
          {Array(3)
            .fill(0)
            .map((a, idx) => (
              <option
                key={idx}
                value={`Format ${idx}`}
              >{`Format ${idx}`}</option>
            ))}
        </datalist>
      </div>
      <div className="form-control">
        <InputField
          label="Edition"
          id="edition"
          onChange={handleChange}
          value={form?.edition}
          extraClassName="d-block pr-1"
        />

        <InputField
          label="Edition Language"
          id="editionLanguage"
          onChange={handleChange}
          value={form?.editionLanguage}
          extraClassName="d-block"
          list="languages"
        />
        <datalist id="languages">
          {["English", "Swedish", "Nepali"].map((a, idx) => (
            <option key={idx} value={a}>
              {a}
            </option>
          ))}
        </datalist>
      </div>
      <div className="form-control d-block">
        <label htmlFor="description">
          Description{" "}
          {form?.subgenre?.isDescriptionRequired ||
          subgenreDetail?.isDescriptionRequired ? (
            <span className="error">*</span>
          ) : null}
        </label>
        <textarea
          id="description"
          onChange={handleChange}
          value={form?.description}
          rows="4"
          required={
            form?.subgenre?.isDescriptionRequired ||
            subgenreDetail?.isDescriptionRequired
          }
        ></textarea>
      </div>
    </div>
  );
};

export default BookForm;
