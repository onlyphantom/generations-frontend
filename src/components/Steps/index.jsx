import { useState } from "react";

// import { UserContext } from "../../contexts/UserContext";

import StepBar from "./StepBar";
import Curation from "./Curation";

const Steps = () => {
  // const { u, c, t } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section
      id="fellowship"
      className="m-4 p-8 flex flex-col justify-center items-center"
    >
      <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />

      {/* display <NoBookmarksYet /> if try has no content */}
      {currentStep === 0 && <Curation setCurrentStep={setCurrentStep} />}
    </section>
  );
};

export default Steps;
