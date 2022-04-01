import React from "react";

import "styles/step-container.scss";
/**
 * Stepper component which takes
 * @param steps list of steps to be displayed
 * @param activeIndex currently active index value to focus on the stepper
 * @param vertical boolean value for horizontal and vertical stepper flow
 * @param isUnsure flag for dynamic fallback step display
 * @callback handleClick callback function on what to do when step is clicked
 */
const Stepper = ({
  steps,
  handleClick,
  activeIndex,
  vertical = false,
  isUnsure = true,
}) => (
  <div className={`stepper-container ${vertical ? "vertical" : ""}`}>
    {steps.map((step, index) => (
      <Step
        key={`step-index-${index}`}
        {...{
          step,
          index: index + 1,
          activeIndex,
          onClick: () => handleClick(index),
        }}
      />
    ))}
    {isUnsure ? (
      <Step
        {...{
          step: "",
          index: "...",
          activeIndex,
          onClick: () => {},
        }}
      />
    ) : null}
  </div>
);

export default Stepper;

const Step = ({ step, index, activeIndex, onClick }) => {
  const isActive = index - 1 === activeIndex;
  return (
    <div className="step">
      <div
        className={`step-detail ${isActive ? "active" : ""}${
          index <= activeIndex ? "complete" : ""
        }`}
        onClick={onClick}
      >
        <span className="step-detail__counter">{index}</span>
        <span className="step-detail__title">{step}</span>
      </div>{" "}
    </div>
  );
};
