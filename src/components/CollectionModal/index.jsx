import React, { useState, useEffect } from "react";

import ListOfBookmarks from "./ListOfBookmarks";
import GitHubVerify from "./GitHubVerify";
import SubmissionForm from "./SubmissionForm";
import { specialCollections } from "../../utils/constants";

const CollectionModal = ({ collectionId, user, collectionStatus }) => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState("premark");
  const [challenge, setChallenge] = useState(false);

  useEffect(() => {
    // Special collections can be submitted wtihout a mentor
    if (
      collectionId in specialCollections &&
      user?.token &&
      collectionStatus !== "completed"
    ) {
      setShowSubmitBtn(true);
    } else if (collectionStatus === "ongoing") {
      setSubmitBtnStatus("submit");
      setShowSubmitBtn(true);
    } else if (collectionStatus === "completed") {
      setSubmitBtnStatus("completed");
      setShowSubmitBtn(false);
    }
  }, [collectionStatus, user, collectionId]);

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
        setChallenge(
          data.data.find(
            (bookmark) => bookmark.attributes.medium === "challenge"
          )
        );
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
            <ListOfBookmarks allbookmarks={bookmarks} />

            {submitBtnStatus === "shownform" ? (
              <SubmissionForm
                user={user}
                collectionId={collectionId}
                challenge={challenge}
              ></SubmissionForm>
            ) : submitBtnStatus === "github_verify" ? (
              <GitHubVerify user={user} collectionId={collectionId} />
            ) : (
              <div className="modal-action">
                {showSubmitBtn ? (
                  <button
                    className="btn btn-outline btn-success btn-sm md:btn-lg"
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
                    Proof of Completion
                  </button>
                ) : submitBtnStatus === "completed" ? (
                  <button className="btn text-success btn-success btn-disabled btn-sm md:btn-lg">
                    Completed 🎉
                  </button>
                ) : (
                  <button className="btn btn-disabled hover:cursor-default btn-sm md:btn-lg">
                    Proof of Completion
                  </button>
                )}

                <label
                  htmlFor={collectionId}
                  className="btn btn-outline btn-sm md:btn-lg"
                >
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
