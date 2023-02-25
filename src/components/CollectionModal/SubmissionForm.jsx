import { useState, useEffect } from "react";

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
  // collectionId is an integer, like 8
  const [prUrl, setPrUrl] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const repo = removeGitHubRoot(challenge.attributes.url);

  useEffect(() => {
    const endpointURL = `https://api.github.com/repos/${repo}/pulls/${fieldValue}`;
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
    const data = await response.json();
    console.log(data);
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
            disabled={submitStatus !== "idle"}
          />
          <button
            className="btn btn-secondary"
            onClick={onSubmit}
            disabled={submitStatus !== "idle"}
          >
            <Send /> {submitStatus === "submitting" ? "Verifying" : "Submit"}
          </button>
        </label>
      </div>
    </div>
  );
};

export default SubmissionForm;
