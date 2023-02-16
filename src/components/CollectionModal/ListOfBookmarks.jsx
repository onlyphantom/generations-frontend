import { useState, useEffect } from "react";

import BookmarkCardCached from "../BookmarkCardCached";
import Empty from "../../icons/Empty";
import Prerequisites from "./Prerequisites";

const ListOfBookmarks = ({ allbookmarks }) => {
  const [bookmarks, setBookmarks] = useState(allbookmarks);
  const [challenge, setChallenge] = useState([]);

  useEffect(() => {
    setBookmarks(
      allbookmarks.filter((x) => x.attributes.medium !== "challenge")
    );
    setChallenge(
      allbookmarks.filter((x) => x.attributes.medium === "challenge")
    );
  }, [allbookmarks]);

  if ((bookmarks.length === 0) & (challenge.length === 0)) {
    return (
      <>
        <Empty />
        <h3 className="mt-2 text-sm font-medium text-gray-300">
          Empty Collection
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This Collection may yet to be updated.
        </p>
      </>
    );
  } else {
    return bookmarks
      .sort((a, b) =>
        b.attributes.createdAt.localeCompare(a.attributes.createdAt)
      )
      .map((bookmark, i) => (
        <div
          key={i}
          className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-2 border-secondary"
        >
          <BookmarkCardCached data={bookmark} key={i} />
          {bookmark.attributes.dependsOn.length > 0 && (
            <Prerequisites prerequisites={bookmark.attributes.dependsOn} />
          )}
        </div>
      ))
      .concat(
        <>
          {challenge.length > 0 && (
            <div className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-2 border-secondary">
              <BookmarkCardCached data={challenge[0]} />
              {challenge[0].attributes.dependsOn.length > 0 && (
                <Prerequisites
                  prerequisites={challenge[0].attributes.dependsOn}
                />
              )}
            </div>
          )}
        </>
      );
  }
};

export default ListOfBookmarks;
