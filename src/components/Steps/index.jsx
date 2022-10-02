import { useState } from "react";
import StepBar from "./StepBar";
import Curation from "./Curation";

const Steps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="m-4 p-8 flex flex-col justify-center items-center">
      <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      {currentStep === 0 && <Curation setCurrentStep={setCurrentStep} />}
    </div>
  );
};

export default Steps;
