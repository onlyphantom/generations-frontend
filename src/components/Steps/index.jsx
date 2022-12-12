import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import StepBar from "./StepBar";
import Curation from "./Curation";
import MentorAssignment from "./MentorAssignment";
import Fellowship from "./Fellowship";
import NoBookmarksYet from "./NoBookmarksYet";
import NotLoggedIn from "../Tray/NotLoggedIn";

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
      if (!user?.token && currentStep > 0) {
        return (
          <div className="mt-4 flex flex-col justify-center items-center">
            <NotLoggedIn />
          </div>
        );
      }

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
        case 2:
          return <Fellowship />;
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
