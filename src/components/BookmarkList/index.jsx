import { useEffect, useState } from "react";
import BookmarkCard from "../BookmarkCard";

export default function BookmarkList(params) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://generationsapi.herokuapp.com/api/bookmarks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookmarks(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-4 flex items-center">
      {!loading
        ? bookmarks
          .sort((a, b) =>
            b.attributes.createdAt.localeCompare(a.attributes.createdAt)
          )
          .map((bookmark, i) => (
            <div key={i}>
              <BookmarkCard url={bookmark.attributes.url} key={i} />
            </div>
          ))
        : "Loading..."}
    </div>
  );
}
