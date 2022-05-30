import { useEffect, useState } from "react";
import CollectionCard from "../CollectionCard";

export default function BookmarkList(params) {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    // <div className="grid lg:grid-cols-3 gap-4 flex items-center">
    <div className="relative flex min-h-screen flex-col justify-center py-6 px-4 sm:py-12">
      <div className="columns-1 xl:columns-3 gap-6 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
        {!loading
          ? collection
              .sort((a, b) =>
                b.attributes.createdAt.localeCompare(a.attributes.createdAt)
              )
              .map((collection, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-lg mt-4 first:mt-0"
                >
                  <CollectionCard attributes={collection.attributes} />
                  {/* <BookmarkCard url={bookmark.attributes.url} key={i} /> */}
                </div>
              ))
          : "Loading..."}
      </div>
    </div>
  );
}
