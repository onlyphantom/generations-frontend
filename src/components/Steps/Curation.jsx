import { useEffect, useContext, useState } from "react";

import { UserContext } from "../../contexts/UserContext";

import NoBookmarksYet from "./NoBookmarksYet";
import { TrayCourses } from "../Tray/TrayContent";

const Curation = ({ setCurrentStep }) => {
  const { u, c, t } = useContext(UserContext);
  const [tray, setTray] = t;
  const [collection] = c;
  const [trayCollections, setTrayCollections] = useState([]);

  useEffect(() => {
    if (Array.isArray(tray)) {
      let bookmarkedCollections = tray.map((t) => {
        let val = collection.find((coll) => coll.id === t.collectionId);
        console.log("t", t);
        return { ...val, status: t.status, expert: t.expert };
      });
      console.log("bookmarkedCollections", bookmarkedCollections);
      setTrayCollections(bookmarkedCollections);
    }
  }, [collection, tray]);

  if (trayCollections.length > 0) {
    return (
      <div className="my-4 w-3/4 max-w-2xl">
        <TrayCourses
          trayCollections={trayCollections}
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
