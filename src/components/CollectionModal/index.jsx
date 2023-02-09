import React, { useState, useEffect } from "react";

import ListOfBookmarks from "./ListOfBookmarks";

import { specialCollections } from "../../utils/constants";
import { cyrb53 } from "../../utils/crypt";

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

const GitHubVerify = ({ user }) => {
  return <div>{cyrb53(user.token.slice(-8))}</div>;
};

const CollectionModal = ({ collectionId, showSubmitButton, user }) => {
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
            <ListOfBookmarks bookmarks={bookmarks} />

            {submitBtnStatus === "shownform" ? (
              <SubmissionForm />
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
