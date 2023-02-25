import { useState, useContext } from "react";

import { cyrb53 } from "../../utils/crypt";

import { UserContext } from "../../contexts/UserContext";

import completeTray from "../Tray/completeTray";
import Send from "../../icons/Send";

const readTxtFromGithub = async (github_username, fellowship_username) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/${github_username}/supertype-fellowship/main/verify-${fellowship_username}.txt`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  console.log("read from github", response);
  return response.text();
};

const GitHubVerify = ({ user, collectionId }) => {
  const { u, c, bc, ta } = useContext(UserContext);
  const [github_username, setGithub_username] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 items-center justify-center">
          <div className="mockup-code min-w-fit">
            <pre
              data-prefix="1"
              className="bg-success text-warning-content text-sm"
            >
              {/* token is ephemereal, stronger / stricter security since it expires */}
              {/* <code>{cyrb53(user.token.slice(-8))}</code> */}
              <code>{cyrb53(user.username.slice(-8))}</code>
            </pre>
          </div>
        </div>
        <div className="col-span-2 text-left">
          <p className="prose prose-slate text-sm ml-4">
            You should create a new repository named{" "}
            <code className="prose-code">supertype-fellowship</code> on GitHub
            following the instructions in the Challenge and in that repository
            upload a file named{" "}
            <code className="prose-code">{`verify-${user.username}.txt`}</code>{" "}
            containing the verification code unique to you (
            <code>{cyrb53(user.username.slice(-8))}</code>) in the first line.
          </p>
        </div>
      </div>

      <div className="form-control my-4">
        <label className="label">
          <p className="label-text text-s prose-slate">
            Enter your GitHub username, ensuring that you have uploaded the
            verification file to (
            <code className="prose-code">
              `github.com/your-github-username/supertype-fellowship/blob/main/verify-$
              {user.username}.txt`
            </code>
            )
          </p>
        </label>
        <label className="input-group">
          <span className="text-sm">GitHub @</span>
          <input
            type="text"
            placeholder="onlyphantom"
            className="input input-bordered w-3/5 input-secondary"
            value={github_username}
            onChange={(e) => setGithub_username(e.target.value)}
            disabled={verifySuccess || loading ? true : false}
          />
          {verifySuccess !== true ? (
            <button
              className="btn btn-success"
              onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                const response = await readTxtFromGithub(
                  github_username,
                  user.username
                );

                if (Number(response) === cyrb53(user.username.slice(-8))) {
                  completeTray(bc, c, ta, u, collectionId, github_username);
                  setVerifySuccess(true);
                } else {
                  setVerifySuccess(false);
                }
                setLoading(false);
                console.log("response", response);
              }}
              disabled={loading ? true : false}
            >
              <Send /> Submit
            </button>
          ) : (
            <span className="text-xs">🎉 All done!</span>
          )}
        </label>
        {verifySuccess ? (
          <div className="toast toast-end mt-4">
            <div className="alert alert-success">
              <div>
                <span>🎉 Verification Successful!</span>
              </div>
            </div>
          </div>
        ) : verifySuccess === false ? (
          <div className="toast toast-end mt-4">
            <div className="alert alert-error">
              <div>
                <span>👎 Verification Failed.</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GitHubVerify;
