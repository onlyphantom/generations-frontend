import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import TrayButton from "./TrayButton";
import TrayDrawer from "./TrayDrawer";
import NotLoggedIn from "./NotLoggedIn";
import TrayContent from "./TrayContent";

const Tray = () => {
  const [trayOpen, setTrayOpen] = useState(false);
  const [trayCollections, setTrayCollections] = useState([]);

  const { u, t, c, ta, ee } = useContext(UserContext);
  const [user] = u;
  const [tray, setTray] = t;
  const [collection] = c;
  const [tagAwards, setTagAwards] = ta;
  const [expendedEffort, setExpendedEffort] = ee;

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

      fetch(`https://generationsapi.herokuapp.com/api/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setExpendedEffort(data.expendedEffort ? data.expendedEffort : 0);
        });
    }
  }, [setTray, setTagAwards, setExpendedEffort, user.token]);

  useEffect(() => {
    // check that tray is initialized
    if (Array.isArray(tray)) {
      let bookmarkedCollections = tray.map((t) => {
        let val = collection.find((coll) => coll.id === t.collectionId);
        return { ...val, status: t.status };
      });

      setTrayCollections(bookmarkedCollections);
    }
  }, [collection, tray]);

  return (
    <div>
      {!trayOpen && <TrayButton setTrayOpen={setTrayOpen} />}

      <TrayDrawer trayOpen={trayOpen} setTrayOpen={setTrayOpen}>
        {!user.token ? (
          <NotLoggedIn />
        ) : (
          <TrayContent
            trayCollections={trayCollections}
            tray={tray}
            setTray={setTray}
            tagAwards={tagAwards}
            expendedEffort={expendedEffort}
          />
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
