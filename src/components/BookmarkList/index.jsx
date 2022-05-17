import { useEffect, useState } from "react";
import BookmarkCard from "../BookmarkCard";
import Mentor from "../Mentor";

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
            .sort((a, b) =>
              b.attributes.createdAt.localeCompare(a.attributes.createdAt)
            )
            .map((bookmark, i) => (
              <div key={i}>
                <BookmarkCard url={bookmark.attributes.url} key={i} />
              </div>
            ))
        : "Loading..."}

      <Mentor />
    </div>
  );
}
