import { useState } from "react";

const postNewTarget = async (target, token) => {
  const response = await fetch(
    `https://generationsapi.herokuapp.com/api/users/me/target`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ target }),
    }
  );
  const data = await response.json();
  return data;
};

const SetTarget = ({ user }) => {
  const [target, setTarget] = useState(30);

  return (
    <div className="mt-4">
      <div className="basis-2/5 mr-3">
        <p className="text-sm font-light text-left">
          Setting targets for the Fellowship program helps you stay focused and
          motivated. Try setting a target for the number of effort points you
          would like to achieve before the end of the program.
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
            onClick={() => postNewTarget(target, user.token)}
          >
            Set Target
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetTarget;
