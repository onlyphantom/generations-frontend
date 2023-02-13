import { useState, useContext, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";

const postNewTarget = async (target, token, setUser, setShowSlider) => {
  await fetch(`https://generationsapi.herokuapp.com/api/users/me/info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      target: target
    }),
  }).then((res) => {
    //   if successful, use setUser to update the target attribute
    //   and set showSlider to false
    if (res.status === 200) {
      setUser((prev) => {
        return {
          ...prev,
          target: target,
        };
      });
      setShowSlider(false);
    }
  });
};

const SetTarget = ({ totalEffortEarned }) => {
  const { u } = useContext(UserContext);
  const [user, setUser] = u;

  const [showSlider, setShowSlider] = useState(false);
  const [target, setTarget] = useState(user.target ? user.target : 30);

  useEffect(() => {
    if (!user.target > 0) {
      setShowSlider(true);
    }
  }, [user.target]);

  if (showSlider) {
    return (
      <div className="mt-4">
        <div className="basis-2/5 mr-3">
          <p className="text-sm font-light text-left">
            Setting targets for the Fellowship program helps you stay focused
            and motivated. Try setting a target for the number of effort points
            you would like to achieve before the end of the program.
          </p>
        </div>
        <div className="basis-3/5">
          <div className="flex flex-row mt-4">
            <div className="basis-4/5">
              <input
                type="range"
                min="15"
                max="50"
                value={target}
                className="range range-success"
                step="5"
                onChange={(e) => setTarget(e.target.value)}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>|</span>
                <span>20</span>
                <span>|</span>
                <span>30</span>
                <span>|</span>
                <span>40</span>
                <span>|</span>
                <span>50</span>
              </div>
            </div>
            <button
              className="btn btn-outline ml-4"
              onClick={() =>
                postNewTarget(target, user.token, setUser, setShowSlider)
              }
            >
              Set Target
            </button>
            {user.target && user.target > 0 && (
              <button
                className="btn btn-square btn-outline ml-4"
                onClick={() => setShowSlider(false)}
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
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (user.target && user.target > 0) {
    return (
      <div className="p-4 rounded-lg col-span-3 md:col-span-2">
        <div className="flex flex-row mt-4">
          <div className="basis-2/5 mr-3 gap-3">
            <div
              className="radial-progress text-success"
              style={{
                "--value": (totalEffortEarned / user.target) * 100,
                "--size": "12rem",
                "--thickness": "2rem",
              }}
            >
              {Math.round((totalEffortEarned / user.target) * 1000) / 10} %
            </div>
          </div>

          <div className="basis-3/5 text-left">
            <div className="stats shadow text-center">
              <div className="stat">
                <div className="stat-title">Current Progress</div>
                <div className="stat-value">{totalEffortEarned}</div>
                <div className="stat-desc">
                  Your target is {user.target} effort points.
                </div>
                <div className="stat-actions">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => setShowSlider(true)}
                  >
                    Change Target
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SetTarget;
