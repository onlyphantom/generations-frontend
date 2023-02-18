import { useEffect, useState, useContext } from "react";
import CollectionCard from "../CollectionCard";

import { UserContext } from "../../contexts/UserContext";

export const getBookmarkedCollections = (
  user,
  collection,
  setBookmarkedCollections
) => {
  fetch(`https://generationsapi.herokuapp.com/api/trays`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Sorry, something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      console.log("data from getbookmarked collections");
      console.log(data.data);
      let trayCollections = data.data.map((t) => {
        let val = collection.find(
          (coll) => coll.id === t.attributes.collection.data.id
        );
        return {
          ...val,
          status: t.attributes.status,
          assigned_expert: t.attributes.expert.data,
          trayId: t.id,
          completed_on: t.attributes.completedOn || t.completed_on,
          tray_updated_at: t.attributes.updatedAt,
          tray_created_at: t.attributes.createdAt,
        };
      });
      console.log(`Setting bookmark`);
      console.log(trayCollections);
      setBookmarkedCollections(trayCollections);
    });
};

export default function BookmarkList() {
  const [loading, setLoading] = useState(true);

  const { u, c, bc } = useContext(UserContext);
  const [user] = u;
  const [collection, setCollection] = c;
  const [, setBookmarkedCollections] = bc;

  useEffect(() => {
    fetch("https://generationsapi.herokuapp.com/api/collections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollection(data.data);
        setLoading(false);
      });
  }, [setCollection]);

  useEffect(() => {
    if (user?.token) {
      getBookmarkedCollections(user, collection, setBookmarkedCollections);
    }
  }, [user, collection, setBookmarkedCollections]);

  if (loading) {
    return (
      <section className="relative flex min-h-screen flex-col justify-center py-6 px-4 sm:py-12">
        <progress className="progress w-56"></progress>
      </section>
    );
  } else {
    return (
      <section
        id="curations"
        className="relative flex min-h-screen flex-col justify-center py-6 px-4 sm:py-12"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          Practical electives,{" "}
          <span className="font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            curated.
          </span>
        </h2>
        <ul className="columns-1 xl:columns-3 gap-6 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit text-center">
          {!loading ? (
            collection
              .sort((a, b) =>
                b.attributes.createdAt.localeCompare(a.attributes.createdAt)
              )
              .map((collection, i) => (
                <li
                  key={i}
                  className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-solid border-4 odd:border-sky-500 even:border-accent odd:text-sky-300 even:text-accent"
                >
                  <CollectionCard
                    attributes={collection.attributes}
                    id={collection.id}
                  />
                  {/* <BookmarkCard url={bookmark.attributes.url} key={i} /> */}
                </li>
              ))
          ) : (
            <progress className="progress w-56"></progress>
          )}
        </ul>
      </section>
    );
  }
}
