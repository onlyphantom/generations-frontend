import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import NoBookmarksYet from "./NoBookmarksYet";

const MentorAssignment = ({ setCurrentStep }) => {
  const { u, c, t } = useContext(UserContext);

  return <div>MentorAssignment</div>;
};

export default MentorAssignment;
