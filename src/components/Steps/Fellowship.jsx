import { useContext, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";

const Fellowship = () => {
  const { ta } = useContext(UserContext);
  const [tagAwards] = ta;

  useEffect(() => {
    console.log(`ta`);
    console.log(tagAwards);
  }, [tagAwards]);

  const FellowshipScoreAlert = () => {
    return (
      <div className="alert shadow-lg m-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-left font-light">
            Scoreboard is a quick way to see your progress and compare it to
            other peers in the same program.
            <br /> As you complete lessons, you will earn points and badges.
            <br />{" "}
            {Object.keys(tagAwards).length > 0
              ? `You have earned ${Object.keys(tagAwards).length} badge(s) 🥇.`
              : `You have not earned any badges yet.`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">Achievements</h3>
      </div>
      <div className="p-4 rounded-lg shadow-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">Current Scores</h3>
        <FellowshipScoreAlert />
      </div>
    </div>
  );
};

export default Fellowship;
