import React, { useState, useEffect } from "react";
import BookmarkCardCached from "../BookmarkCardCached";

const CollectionModal = ({ collectionId }) => {
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
    return <progress className="progress w-56"></progress>;
  } else {
    return (
      <>
        <input type="checkbox" id={collectionId} className="modal-toggle" />
        <div className="modal modal-bottom m:modal-middle">
          <div className="modal-box w-11/12 max-w-4xl">
            <label
              htmlFor={collectionId}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            {bookmarks.length > 0 ? (
              bookmarks
                .sort((a, b) =>
                  b.attributes.createdAt.localeCompare(a.attributes.createdAt)
                )
                .map((bookmark, i) => (
                  <div
                    key={i}
                    className="break-inside-avoid rounded-lg mt-4 first:mt-0 border-solid border-2 
                    border-secondary odd:text-sky-300 even:text-accent"
                  >
                    <BookmarkCardCached data={bookmark} key={i} />
                  </div>
                ))
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">
                  Empty Collection
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This Collection may yet to be updated.
                </p>
              </>
            )}
            <div className="modal-action">
              <label htmlFor={collectionId} className="btn">
                Got it!
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default CollectionModal;
