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
        console.log(data.data);
        setBookmarks(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!loading
        ? bookmarks
            .sort((a, b) => b.created_at.localeCompare(a.created_at))
            .map((bookmark, i) => (
              <div key={i}>
                <p>{JSON.stringify(bookmark.attributes)}</p>
                <BookmarkCard url={bookmark.attributes.url} key={i} />
              </div>
            ))
        : "Loading..."}
    </div>
  );
}
