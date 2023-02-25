import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import completeTray from "../Tray/completeTray";
import ExternalLink from "../../icons/ExternalLink";
import Send from "../../icons/Send";

function removeGitHubRoot(url) {
  return url.replace(/^https?:\/\/github.com\//, "");
}

const ProtipPreview = ({ prUrl }) => {
  return (
    <span className="label-text text-xs text-left prose-slate">
      <h5 className="font-semibold uppercase my-1">💡 Pro tip:</h5>
      Verify your PR submission at &nbsp;
      <a
        href={prUrl}
        target="_blank"
        rel="noreferrer"
        className="font-semibold link hover:link-secondary"
      >
        {prUrl}
        <ExternalLink />
      </a>
      &nbsp; before submitting your proof of completion.
    </span>
  );
};

const SubmissionForm = ({ user, collectionId, challenge }) => {
  const { u, c, bc, ta } = useContext(UserContext);

  // collectionId is an integer, like 8
  const [prUrl, setPrUrl] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const repo = removeGitHubRoot(challenge.attributes.url);

  useEffect(() => {
    // const endpointURL = `https://api.github.com/repos/${repo}/pulls/${fieldValue}`;
    const endpointURL = `https://api.github.com/repos/onlyphantom/emailnetwork/pulls/${fieldValue}`;
    setPrUrl(endpointURL);
  }, [fieldValue, repo]);

  const onSubmit = async () => {
    setSubmitStatus("submitting");
    console.log("Trying to submit check to", prUrl);

    const response = await fetch(prUrl, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    // if status is 404, handle error
    if (response.status === 404) {
      setSubmitStatus("failure");
      return;
    }
    if (response.status === 200) {
      console.log("200-ed");
      await response.json().then((data) => {
        console.log(data);
        console.log(data.merged, data.merged_at);

        if (
          !("githubUsername" in user) ||
          data.user.login !== user.githubUsername
        ) {
          // not the same user
          setSubmitStatus("failure");
          console.log(
            "not the same user (or haven't gh-verify), not bother checking"
          );
          return;
        } else if (data.merged && data.merged_at) {
          // if data is not empty, handle success
          // setSubmitStatus("success");
          // console.log(data.merged, data.merged_at);
          setSubmitStatus("success");
          completeTray(bc, c, ta, u, collectionId);
        } else {
          setSubmitStatus("failure");
        }
      });
    }
  };

  return (
    <div>
      <div className="form-control">
        <span className="label">
          {fieldValue && <ProtipPreview prUrl={prUrl} />}
        </span>
        <label className="input-group">
          <span className="text-sm text-secondary">Pull Request ID</span>

          <input
            type="number"
            placeholder="e.g 12"
            className="input input-bordered"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            disabled={submitStatus === "success"}
          />
          <button
            className="btn btn-secondary"
            onClick={onSubmit}
            disabled={
              submitStatus === "success" || submitStatus === "submitting"
            }
          >
            <Send /> {submitStatus === "submitting" ? "Verifying" : "Submit"}
          </button>
        </label>
        {submitStatus === "success" ? (
          <div className="toast toast-end mt-4">
            <div className="alert alert-success">
              <div>
                <span>🎉 Verification Successful!</span>
              </div>
            </div>
          </div>
        ) : (
          submitStatus === "failure" && (
            <div className="toast toast-end mt-4">
              <div className="alert alert-error">
                <div>
                  <p className="text-sm text-justify">
                    <h3 className="text-md uppercase font-semibold mb-2">
                      👎 Verification Failed
                    </h3>
                    Verify your PR submission at &nbsp;
                    <a
                      href={prUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold link hover:link-secondary"
                    >
                      {prUrl}
                      <ExternalLink />
                    </a>
                    &nbsp; before submitting your proof of completion.
                    <br />
                    You should see a valid timestamp for the `merged_at` field
                    and that the `user.login` field matches the GitHub username
                    that you have verified with on Fellowship.
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubmissionForm;
