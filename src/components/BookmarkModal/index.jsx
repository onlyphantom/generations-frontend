import React, { useState, useEffect } from "react";

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
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label
              for={collectionId}
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="font-bold text-lg">
              Congratulations random Internet user!
            </h3>

            {bookmarks.length > 0 ? (
              JSON.stringify(bookmarks)
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
