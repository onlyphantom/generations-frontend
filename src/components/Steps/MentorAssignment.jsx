import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import NoBookmarksYet from "./NoBookmarksYet";

const MentorAssignment = ({ setCurrentStep }) => {
  const { u, c, bc } = useContext(UserContext);

  return <div>MentorAssignment</div>;
};

export default MentorAssignment;
