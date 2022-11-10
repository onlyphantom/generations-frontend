import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

// import NoBookmarksYet from "./NoBookmarksYet";

const MentorAssignment = () => {
  // const { u, c, bc, e } = useContext(UserContext);
  const { bc } = useContext(UserContext);
  const [bookmarkedCollections, setBookmarkedCollections] = bc;

  useEffect(() => {
    console.log(bookmarkedCollections);
    console.log(setBookmarkedCollections);
  }, [bookmarkedCollections, setBookmarkedCollections]);

  return (
    <div>
      MentorAssignment
      <hr />
    </div>
  );
};

export default MentorAssignment;
