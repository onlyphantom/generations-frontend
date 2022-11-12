import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import StepBar from "./StepBar";
import Curation from "./Curation";
import MentorAssignment from "./MentorAssignment";
import NoBookmarksYet from "./NoBookmarksYet";

const Steps = () => {
  const { u, bc } = useContext(UserContext);
  const [bookmarkedCollections, setBookmarkedCollections] = bc;
  const [currentStep, setCurrentStep] = useState(0);
  const [user] = u;

  const StepContent = () => {
    if (bookmarkedCollections.length === 0) {
      return (
        <div className="flex items-center justify-center mt-4">
          <NoBookmarksYet />
        </div>
      );
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
      // className="m-4 p-8 flex flex-col justify-center items-center"
      className="m-4 p-8 flex flex-col justify-center"
    >
      <StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <StepContent />
    </section>
  );
};

export default Steps;
