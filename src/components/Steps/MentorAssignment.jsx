import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

// import NoBookmarksYet from "./NoBookmarksYet";

const MentorAssignment = ({ setCurrentStep }) => {
  // const { u, c, bc } = useContext(UserContext);
  const { e } = useContext(UserContext);

  return (
    <div>
      MentorAssignment
      <p className="text-xs">{JSON.stringify(e)}</p>
    </div>
  );
};

export default MentorAssignment;
