import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useGenre from "hooks/useGenre";

import "styles/homeStyles.scss";

import BookForm from "./BookForm";
import Button from "components/Button";
import Stepper from "components/Stepper";
import GenreContainer from "./GenreContainer";
import ConfirmationPage from "./ConfirmationPage";
import SubGenreContainer from "./SubGenreContainer";
import AddSubGenreContainer from "./AddSubGenreContainer";

import { valueChanged, deleteValue, fetchGenres } from "actions/baseActions";

const App = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { genres, getSubgenreDetailById, getGenreDetail } = useGenre();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  const form = useSelector((state) => state.base?.get("form"))?.toJS();
  const steps = ["Genre", "Subgenre", "Add new subgenre", "Information"];
  const stepsMin = ["Genre", "Subgenre", "Information"];

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  const isSubgenreAdded = !!form?.subgenre || !!form?.addingNewSubGenre;
  const subgenre = getSubgenreDetailById(form?.genre, form?.subgenre);

  useEffect(() => {
    let status = false;
    if (!!form?.genre) {
      switch (currentIndex) {
        case 0:
          status = true;
          break;
        case 1:
          status = isSubgenreAdded;
          break;
        case 2:
          status = !!form?.subgenre?.name;
          break;
        case 3:
          status =
            !!form?.title && subgenre?.isDescriptionRequired
              ? !!form?.description
              : true;
          break;
        default:
          status = false;
      }
    }

    setIsNextButtonActive(status);
  }, [currentIndex, form, getSubgenreDetailById, isSubgenreAdded, subgenre]);

  const getPage = (_) => {
    switch (currentIndex) {
      case 1:
        return <SubGenreContainer />;
      case 2:
        return <AddSubGenreContainer subgenre={form?.subgenre} />;
      case 3:
        return <BookForm />;
      default:
        return <GenreContainer form={form} genres={genres} />;
    }
  };

  const onStepClick = (index) => {
    if (
      index === 0 ||
      (index === 1 && !!form?.genre) ||
      (index >= 2 && !!form?.subgenre)
    )
      setCurrentIndex(
        typeof form?.subgenre === "number" && index === 2 ? 3 : index
      );
  };

  const handleBack = (_) => {
    if (currentIndex) {
      setCurrentIndex(
        currentIndex - (typeof form?.subgenre === "number" && isLast ? 2 : 1)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;

    if (target.checkValidity()) {
      isLast ? onSubmit() : handleNext();
    }
  };

  const onSubmit = async (_) => {
    setSubmitting(true);
    const { addingNewSubGenre,...bookDetail } = form;
    if (addingNewSubGenre) {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log("Posting Subgenre Data", bookDetail?.subgenre);
          // Random id for subgenre api response
          const id = Math.floor(Math.random() * (100 - 20)) + 20;
          const genreDetail = getGenreDetail(form?.genre);
          const responseData = { ...bookDetail?.subgenre, id };

          genreDetail["subgenres"] = [...genreDetail?.subgenres, responseData];

          dispatch(valueChanged(`genres.${form?.genre}`, genreDetail));
          dispatch(valueChanged("form.subgenre", id));
          bookDetail.subgenre = id;
          resolve(responseData);
        }, 2000);
      });
    }

    const { status } = await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Posting Book Data", bookDetail);
        const id = Math.floor(Math.random() * (100 - 20)) + 20;
        const responseData = { ...bookDetail, id };
        resolve({ data: responseData, status: true });
      }, 2000);
    });
    if (status) setCurrentIndex("confirm");
    setSubmitting(false);
  };

  const handleNext = (_) => {
    isNextButtonActive &&
      setCurrentIndex(
        currentIndex +
          (typeof form?.subgenre === "number" && currentIndex === 1 ? 2 : 1)
      );
  };

  const handleCreateNew = (_) => {
    setCurrentIndex(0);
    dispatch(deleteValue("form"));
  };

  return (
    <div className="app-container p-2">
      {currentIndex === "confirm" ? (
        <ConfirmationPage handleCreateNew={handleCreateNew} />
      ) : (
        <>
          <div className="my-2">Add book - New book</div>
          <form onSubmit={handleSubmit}>
            <Stepper
              steps={
                !isSubgenreAdded
                  ? steps?.slice(0, 2)
                  : !!form?.addingNewSubGenre
                  ? steps
                  : stepsMin
              }
              handleClick={onStepClick}
              activeIndex={
                currentIndex === 3 && !form?.addingNewSubGenre
                  ? 2
                  : currentIndex
              }
              isUnsure={!isSubgenreAdded}
            />
            <main>{getPage()}</main>
            <section className="action-buttons">
              <Button
                extraClassName={`${!!currentIndex ? "" : "disabled"}`}
                label={<span className="chevron-left">Back</span>}
                onClick={handleBack}
                disabled={submitting || isFirst}
              />
              <Button
                extraClassName={`active px-3`}
                label={isLast ? "Add" : "Next"}
                type="submit"
                loading={submitting}
                disabled={isLast ? false : !isNextButtonActive}
              />
            </section>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
