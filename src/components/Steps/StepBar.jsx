import React from "react";

const stepButtonStyles =
  "btn btn-outline transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:button-secondary duration-300";

const StepBar = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="m-4 p-8 flex flex-col justify-center">
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li
          className={`step ${currentStep >= 0 && "step-secondary"}`}
          onClick={() => setCurrentStep(0)}
        >
          <button
            className={`${
              currentStep === 0
                ? "text-secondary font-medium"
                : stepButtonStyles
            }`}
            onClick={() => setCurrentStep(0)}
          >
            <h6>Curations</h6>
          </button>
        </li>
        <li
          className={`step ${currentStep >= 1 && "step-secondary"}`}
          onClick={() => setCurrentStep(1)}
        >
          <button
            className={`${
              currentStep === 1
                ? "text-secondary font-medium"
                : stepButtonStyles
            }`}
            onClick={() => setCurrentStep(1)}
          >
            <h6>Pick a Cohort</h6>
          </button>
        </li>
        <li className={`step ${currentStep >= 2 && "step-secondary"}`}>
          <button
            className={`${
              currentStep === 2
                ? "text-secondary font-medium"
                : stepButtonStyles
            }`}
            onClick={() => setCurrentStep(2)}
          >
            Registration
          </button>
        </li>
        <li className={`step ${currentStep >= 3 && "step-secondary"}`}>
          <button
            className={`${
              currentStep === 3
                ? "text-secondary font-medium"
                : stepButtonStyles
            }`}
            onClick={() => setCurrentStep(3)}
          >
            Work Placement
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StepBar;
