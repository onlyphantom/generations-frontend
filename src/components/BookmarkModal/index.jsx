import React, { useState, useEffect } from "react";
import BookmarkCardCached from "../BookmarkCardCached";

const BookmarkModal = ({ collectionId }) => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://generationsapi.herokuapp.com/api/collections/${collectionId}/bookmarks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookmarks(data.data);
        setLoading(false);
      });
  }, [collectionId]);

  if (loading) {
    return <progress class="progress w-56"></progress>;
  } else {
    return (
      <>
        <input type="checkbox" id={collectionId} class="modal-toggle" />
        <div class="modal modal-bottom m:modal-middle">
          <div class="modal-box w-11/12 max-w-4xl">
            <label
              for={collectionId}
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            {bookmarks.length > 0 ? (
              bookmarks
                .sort((a, b) =>
                  b.attributes.createdAt.localeCompare(a.attributes.createdAt)
                )
                .map((bookmark, i) => (
                  <li
                    key={i}
                    className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-solid border-2 
                    border-secondary odd:text-sky-300 even:text-accent"
                  >
                    <BookmarkCardCached data={bookmark} key={i} />
                  </li>
                ))
            ) : (
              <p>No bookmarks in this collection</p>
            )}
            <div class="modal-action">
              <label for={collectionId} class="btn">
                Got it!
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default BookmarkModal;
