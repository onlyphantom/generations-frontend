import React, { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import TrayButton from "./TrayButton";
import TrayDrawer from "./TrayDrawer";
import NotLoggedIn from "./NotLoggedIn";
import TrayContent from "./TrayContent";
// import TrayCard from "./TrayCard";

const Tray = () => {
  const [trayOpen, setTrayOpen] = useState(false);

  const { u, t } = useContext(UserContext);
  const [user] = u;
  const [tray, setTray] = t;

  return (
    <div>
      {!trayOpen && <TrayButton setTrayOpen={setTrayOpen} />}


      <TrayDrawer trayOpen={trayOpen} setTrayOpen={setTrayOpen}>
        {
          !user.token
            ? <NotLoggedIn />
            : <TrayContent tray={tray} setTray={setTray} />
        }
        {/* <TrayCard setTray={setTray} /> */}
        <p className="text-xs text-gray-500">
          {JSON.stringify(user.token)} |{" "}
          {user.token ? "Logged in" : "Not logged in"}
        </p>
      </TrayDrawer>
    </div>
  );
};

export default Tray;
