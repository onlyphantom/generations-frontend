import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import NoBookmarksYet from "./NoBookmarksYet";
import { TrayCourses } from "../Tray/TrayContent";

const Curation = ({ setCurrentStep }) => {
  const { u, t, bc } = useContext(UserContext);
  const [tray, setTray] = t;
  const [bookmarkedCollections] = bc;

  console.log("bookmarkedCollections", bookmarkedCollections);
  
  if (bookmarkedCollections.length > 0) {
    return (
      <div className="my-4 w-3/4 max-w-2xl">
        <TrayCourses
          trayCollections={bookmarkedCollections}
          tray={tray}
          setTray={setTray}
          user={u}
        />
      </div>
    );
  } else {
    return <NoBookmarksYet />;
  }
};

export default Curation;
