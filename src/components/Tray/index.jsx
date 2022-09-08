import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import TrayButton from "./TrayButton";
import TrayDrawer from "./TrayDrawer";
import NotLoggedIn from "./NotLoggedIn";
import TrayContent from "./TrayContent";
// import TrayCard from "./TrayCard";

const Tray = () => {
  const [trayOpen, setTrayOpen] = useState(false);
  const [trayCard, setTrayCard] = useState([]);

  const { u, t, c } = useContext(UserContext);
  const [user] = u;
  const [tray, setTray] = t;
  const [collection] = c;

  useEffect(() => {
    // check that tray is initialized
    if (Array.isArray(tray)) {
      let bookmarkedCollections = collection.filter((coll) => {
        return tray.includes(coll.id);
      });
      setTrayCard(bookmarkedCollections);
    }
  }, [collection, tray]);

  return (
    <div>
      {!trayOpen && <TrayButton setTrayOpen={setTrayOpen} />}

      <TrayDrawer trayOpen={trayOpen} setTrayOpen={setTrayOpen}>
        {!user.token ? (
          <NotLoggedIn />
        ) : (
          <TrayContent tray={trayCard} setTray={setTray} />
        )}
        <p className="text-xs text-gray-500">
          {JSON.stringify(user.token)} | {JSON.stringify(tray)}
          {user.token ? "Logged in" : "Not logged in"}
        </p>
      </TrayDrawer>
    </div>
  );
};

export default Tray;
