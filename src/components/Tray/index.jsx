import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import TrayButton from "./TrayButton";
import TrayDrawer from "./TrayDrawer";
import NotLoggedIn from "./NotLoggedIn";
import TrayContent from "./TrayContent";

const Tray = () => {
  const [trayOpen, setTrayOpen] = useState(false);

  const { u, t, c, bc, ta } = useContext(UserContext);
  const [user] = u;
  const [tray, setTray] = t;
  const [collection] = c;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;
  const [tagAwards, setTagAwards] = ta;

  useEffect(() => {
    if (user?.token) {
      fetch(`https://generationsapi.herokuapp.com/api/trays`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let collections = data.data.map((tray) => {
            let collection = {
              collectionId: tray.attributes.collection.data.id,
              status: tray.attributes.status,
              expert: tray.attributes.expert.data,
            };
            return collection;
          });
          setTray(collections);
        });

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
  }, [setTray, setTagAwards, user?.token]);

  useEffect(() => {
    // check that tray is initialized
    if (Array.isArray(tray)) {
      let trayCollections = tray.map((t) => {
        let val = collection.find((coll) => coll.id === t.collectionId);
        return { ...val, status: t.status, assigned_expert: t.expert?.id };
      });

      setBookmarkedCollections(trayCollections);
    }
  }, [collection, tray, setBookmarkedCollections]);

  return (
    <div>
      {!trayOpen && <TrayButton setTrayOpen={setTrayOpen} />}

      <TrayDrawer trayOpen={trayOpen} setTrayOpen={setTrayOpen}>
        {!user?.token ? (
          <NotLoggedIn />
        ) : (
          <TrayContent
            trayCollections={bookmarkedCollections}
            tray={tray}
            setTray={setTray}
            tagAwards={tagAwards}
            expendedEffort={user.expendedEffort}
          />
        )}
        <p className="text-xs text-gray-500">
          {JSON.stringify(user?.token)} | {JSON.stringify(tray)}
          {user?.token ? "Logged in" : "Not logged in"}
        </p>
      </TrayDrawer>
    </div>
  );
};

export default Tray;
