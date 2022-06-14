import React, { useState } from "react";
import TrayButton from "./TrayButton";
import TrayDrawer from "./TrayDrawer";
import TrayCard from "./TrayCard";

const Tray = () => {
  const [trayOpen, setTrayOpen] = useState(false);

  return (
    <div>
      {!trayOpen && <TrayButton setTrayOpen={setTrayOpen} />}
      <TrayDrawer trayOpen={trayOpen} setTrayOpen={setTrayOpen}>
        <TrayCard />
        <TrayCard />
        <TrayCard />
      </TrayDrawer>
    </div>
  );
};

export default Tray;
