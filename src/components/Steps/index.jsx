import { useState } from "react";
import StepBar from "./StepBar";

const Steps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />;
};

export default Steps;
