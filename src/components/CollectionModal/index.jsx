import React, { useState, useEffect } from "react";
import BookmarkCardCached from "../BookmarkCardCached";

const SubmissionForm = ({ collectionId }) => {
  return (
    <div>
      <div className="form-control mt-4">
        <label className="label">
          <h3 className="label-text text-l">Proof of Completion</h3>
        </label>
        <label className="input-group">
          <span className="text-sm">URL</span>
          <input
            type="text"
            placeholder="https://github.com/onlyphantom/Submission-URL"
            className="input input-bordered w-full"
          />
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>{" "}
            Submit
          </button>
        </label>
      </div>
    </div>
  );
};

const CollectionModal = ({ collectionId, showSubmitButton }) => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [submitBtnStatus, setSubmitBtnStatus] = useState("premark");

  // const onSubmitForm = () => {
  //   setSubmitBtnStatus("submitting");
  //   fetch(
  //     `https://generationsapi.herokuapp.com/api/collections/${collectionId}/submit`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setSubmitBtnStatus("submitted");
  //       console.log(data);
  //     });
  // };

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

    return () => {
      setSubmitBtnStatus("premark");
    };
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

            {submitBtnStatus === "shownform" ? (
              <SubmissionForm />
            ) : (
              <div className="modal-action">
                {showSubmitButton ? (
                  <button
                    className="btn btn-outline btn-success"
                    onClick={() => setSubmitBtnStatus("shownform")}
                  >
                    Mark Challenge as Completed
                  </button>
                ) : (
                  <label className="btn btn-disabled hover:cursor-default">
                    Mark Challenge as Completed
                  </label>
                )}

                <label htmlFor={collectionId} className="btn btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close
                </label>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};
export default CollectionModal;
