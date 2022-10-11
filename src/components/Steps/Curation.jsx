import { useEffect, useContext, useState } from "react";

import { UserContext } from "../../contexts/UserContext";

import NoBookmarksYet from "./NoBookmarksYet";
import { TrayCourses } from "../Tray/TrayContent";

const Curation = ({ setCurrentStep }) => {
  const { u, c, t } = useContext(UserContext);
  const [tray, setTray] = t;
  const [collection] = c;
  const [trayCard, setTrayCard] = useState([]);

  useEffect(() => {
    if (Array.isArray(tray)) {
      let bookmarkedCollections = collection.filter((coll) => {
        return tray.includes(coll.id);
      });
      setTrayCard(bookmarkedCollections);
      console.log(collection);
      console.log(tray);
      console.log(bookmarkedCollections);
    }
  }, [collection, tray]);

  if (trayCard.length > 0) {
    return (
      <div className="my-4 w-3/4">
        <p>{JSON.stringify(trayCard)}</p>
        <TrayCourses
          tray={trayCard}
          trayIdArray={tray}
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
