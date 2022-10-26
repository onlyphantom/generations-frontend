import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import StepBar from "./StepBar";
import Curation from "./Curation";
import MentorAssignment from "./MentorAssignment";
import NoBookmarksYet from "./NoBookmarksYet";

const Steps = () => {
  const { u, t, bc, e } = useContext(UserContext);
  const [tray, setTray] = t;
  const [bookmarkedCollections] = bc;
  const [currentStep, setCurrentStep] = useState(0);

  console.log("e", e);

  const StepContent = () => {
    if (bookmarkedCollections.length === 0) {
      return <NoBookmarksYet />;
    } else {
      switch (currentStep) {
        case 0:
          return (
            <Curation
              setCurrentStep={setCurrentStep}
              bc={bookmarkedCollections}
              tray={tray}
              setTray={setTray}
              u={u}
            />
          );
        case 1:
          return <MentorAssignment />;

        default:
          return "Section under construction. Coming soon.";
      }
    }
  };

  return (
    <section
      id="fellowship"
      className="m-4 p-8 flex flex-col justify-center items-center"
    >
      <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <StepContent />
    </section>
  );
};

export default Steps;
