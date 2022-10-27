import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import StepBar from "./StepBar";
import Curation from "./Curation";
import MentorAssignment from "./MentorAssignment";
import NoBookmarksYet from "./NoBookmarksYet";

const Steps = () => {
  const { u, bc, e } = useContext(UserContext);
  const [bookmarkedCollections, setBookmarkedCollections] = bc;
  const [currentStep, setCurrentStep] = useState(0);
  const [user] = u;

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
              bookmarkedCollections={bookmarkedCollections}
              setBookmarkedCollections={setBookmarkedCollections}
              user={user}
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
