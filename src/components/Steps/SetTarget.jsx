import { useState, useContext, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";

const postNewTarget = async (target, token, setUser, setShowSlider) => {
  await fetch(`https://generationsapi.herokuapp.com/api/users/me/target`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        target: target,
      },
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
  const [target, setTarget] = useState(30);

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
          </div>
        </div>
      </div>
    );
  }
  if (user.target && user.target > 0) {
    return (
      <p>
        {`Your target is ${user.target} effort points, and you have
        ${totalEffortEarned} effort points.`}
      </p>
    );
  }
};

export default SetTarget;
