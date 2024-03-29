import React from "react";

const stepButtonStyles =
  "btn transition ease-in-out hover:button-secondary btn-secondary";

const StepBar = ({ currentStep, setCurrentStep }) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal">
      <li
        className={`step ${currentStep >= 0 && "step-secondary"}`}
        onClick={() => setCurrentStep(0)}
      >
        <button
          className={`btn ${currentStep === 0 && stepButtonStyles}`}
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
          className={`btn ${currentStep === 1 && stepButtonStyles}`}
          onClick={() => setCurrentStep(1)}
        >
          <h6>Mentors Assignment</h6>
        </button>
      </li>
      <li className={`step ${currentStep >= 2 && "step-secondary"}`}>
        <button
          className={`btn ${currentStep === 2 && stepButtonStyles}`}
          onClick={() => setCurrentStep(2)}
        >
          Timeline
        </button>
      </li>
      <li className={`step ${currentStep >= 3 && "step-secondary"}`}>
        <button
          className={`btn ${currentStep === 3 && stepButtonStyles}`}
          onClick={() => setCurrentStep(3)}
        >
          Scoreboard
        </button>
      </li>
    </ul>
  );
};

export default StepBar;
