import { useState, useContext } from "react";

import { cyrb53 } from "../../utils/crypt";

import { UserContext } from "../../contexts/UserContext";
import addOrRemoveFromTray from "../Tray/addOrRemoveFromTray";

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

const setStateInDB = async (u, github_username, collectionId, c, bc) => {
  const [collection] = c;
  const [user, setUser] = u;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;

  await fetch(`https://generationsapi.herokuapp.com/api/users/me/info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({
      githubUsername: github_username,
    }),
  }).then((res) =>
    setUser((prev) => {
      return {
        ...prev,
        githubUsername: github_username,
      };
    })
  );

  // also need to add a Tray to user in DB with status being 'completed'
  const trayIndex = bookmarkedCollections.findIndex(
    (t) => t.id === collectionId
  );

  if (trayIndex === -1) {
    addOrRemoveFromTray(
      bookmarkedCollections,
      collectionId,
      setBookmarkedCollections,
      user,
      collection
    );
  }

  await fetch(
    `https://generationsapi.herokuapp.com/api/trays/collections/${collectionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        data: {
          status: "completed",
        },
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const updatedData = {
        status: "completed",
        tray_updated_at: data.data?.attributes?.updatedAt,
      };
      setBookmarkedCollections((prev) => [
        ...prev.splice(
          trayIndex === -1 ? bookmarkedCollections.length - 1 : trayIndex,
          1
        ),
        Object.assign(
          {},
          prev[trayIndex === -1 ? bookmarkedCollections.length - 1 : trayIndex],
          updatedData
        ),
      ]);
    });
};

const GitHubVerify = ({ user, collectionId }) => {
  const { u, c, bc } = useContext(UserContext);
  const [github_username, setGithub_username] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(null);

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
            className="input input-bordered w-3/4 input-secondary"
            value={github_username}
            onChange={(e) => setGithub_username(e.target.value)}
            disabled={verifySuccess ? true : false}
          />
          {verifySuccess !== true ? (
            <button
              className="btn btn-success"
              onClick={async () => {
                const response = await readTxtFromGithub(
                  github_username,
                  user.username
                );

                if (Number(response) === cyrb53(user.username.slice(-8))) {
                  setVerifySuccess(true);
                  setStateInDB(u, github_username, collectionId, c, bc);
                } else {
                  // console.log("response received is");
                  // console.log(Number(response));
                  // console.log(cyrb53(user.username.slice(-8)));
                  setVerifySuccess(false);
                }
                console.log("response", response);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>{" "}
              Submit
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
