import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

// import TrayButton from "./TrayButton";
import TrayDrawer from "./TrayDrawer";
import NotLoggedIn from "./NotLoggedIn";
import TrayContent from "./TrayContent";

const Tray = () => {
  const [trayOpen, setTrayOpen] = useState(false);

  const { u, bc, ta } = useContext(UserContext);
  const [user] = u;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;
  const [tagAwards, setTagAwards] = ta;

  useEffect(() => {
    if (user?.token) {
      fetch(`https://generationsapi.herokuapp.com/api/tag-awards`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTagAwards(data.data.attributes.tagsCount);
        });
    }
  }, [setTagAwards, user]);

  return (
    <div>
      {/* {!trayOpen && <TrayButton setTrayOpen={setTrayOpen} />} */}

      <TrayDrawer trayOpen={trayOpen} setTrayOpen={setTrayOpen}>
        {!user?.token ? (
          <NotLoggedIn />
        ) : (
          <TrayContent
            bookmarkedCollections={bookmarkedCollections}
            setBookmarkedCollections={setBookmarkedCollections}
            tagAwards={tagAwards}
            expendedEffort={user.expendedEffort}
          />
        )}
      </TrayDrawer>
    </div>
  );
};

export default Tray;
