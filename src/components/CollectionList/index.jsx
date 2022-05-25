import { useEffect, useState } from "react";

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
    <div className="grid lg:grid-cols-3 gap-4 flex items-center">
      {!loading
        ? collection
            .sort((a, b) =>
              b.attributes.createdAt.localeCompare(a.attributes.createdAt)
            )
            .map((collection, i) => (
              <div key={i}>
                <p>Collection {collection.attributes.title}</p>
                {/* <BookmarkCard url={bookmark.attributes.url} key={i} /> */}
              </div>
            ))
        : "Loading..."}
    </div>
  );
}
