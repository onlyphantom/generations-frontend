import React, { useState, useEffect } from "react";

import ListOfBookmarks from "./ListOfBookmarks";
import GitHubVerify from "./GitHubVerify";
import SubmissionForm from "./SubmissionForm";
import { specialCollections } from "../../utils/constants";

const CollectionModal = ({ collectionId, showSubmitButton, user }) => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [submitBtnStatus, setSubmitBtnStatus] = useState("premark");

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
          <div className="modal-box w-11/12 max-w-4xl py-8">
            <label
              htmlFor={collectionId}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <ListOfBookmarks bookmarks={bookmarks} />

            {submitBtnStatus === "shownform" ? (
              <SubmissionForm collectionId={collectionId}></SubmissionForm>
            ) : submitBtnStatus === "github_verify" ? (
              <GitHubVerify user={user} />
            ) : (
              <div className="modal-action">
                {showSubmitButton ? (
                  <button
                    className="btn btn-outline btn-success"
                    // onClick={() => setSubmitBtnStatus()}
                    onClick={() => {
                      if (
                        user &&
                        specialCollections[collectionId] === "_onboarding"
                      ) {
                        setSubmitBtnStatus("github_verify");
                      } else {
                        setSubmitBtnStatus("shownform");
                      }
                    }}
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
