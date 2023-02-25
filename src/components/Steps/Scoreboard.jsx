import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import CardTags from "../CollectionCard/CardTags";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";
import { EarningBoard } from "./EarningBoard";
import SetTarget from "./SetTarget";

import NoPlusMembership from "./NoPlusMembership";
import Money from "../../icons/Money";
import Statistics from "../../icons/Statistics";

const Scoreboard = () => {
  const { u, ta, bc } = useContext(UserContext);
  const [user] = u;
  const [tagAwards] = ta;
  const [bookmarkedCollections] = bc;
  const [completedCollections, setCompletedCollections] = useState([]);
  const [pointsPerWeek, setPointsPerWeek] = useState(0);
  const [totalEffortEarned, setTotalEffortEarned] = useState(0);
  const [weekSinceCreated, setWeekSinceCreated] = useState(0);

  useEffect(() => {
    setCompletedCollections(
      bookmarkedCollections.filter(
        (collection) => collection.status === "completed"
      )
    );
  }, [bookmarkedCollections]);

  useEffect(() => {
    setTotalEffortEarned(user.expendedEffort);

    // calculate points per week
    const today = new Date();
    const userCreatedDate = new Date(user.createdAt);

    const weeksSinceUserCreated = Math.round(
      (today - userCreatedDate) / (1000 * 60 * 60 * 24 * 7)
    );
    setWeekSinceCreated(weeksSinceUserCreated);

    const pointsPerWeek = (user.expendedEffort / weeksSinceUserCreated).toFixed(
      2
    );
    setPointsPerWeek(pointsPerWeek);
  }, [completedCollections, user.createdAt, user.expendedEffort]);

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">
          Paid Project Opportunities &nbsp;
          <Money />
        </h3>
        {!user.proUser ? (
          <NoPlusMembership />
        ) : user.earnings.length > 0 ? (
          EarningBoard(user)
        ) : (
          `You are not eligible for paid project opportunities yet.
          Complete a few lessons and check back soon.`
        )}
      </div>
      <div className="p-4 rounded-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">
          Key Statistics &nbsp; <Statistics />
        </h3>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Completed Lessons</div>
            <div className="stat-value text-primary">
              {completedCollections.length}
            </div>
            <div className="stat-desc">{`out of ${bookmarkedCollections.length} lessons bookmarked`}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Effort Points</div>
            <div className="stat-value text-secondary">{totalEffortEarned}</div>
            <div className="stat-desc">avg +{pointsPerWeek} points/week</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-value">
              {tagAwards ? Object.keys(tagAwards).length : 0}
            </div>
            <div className="stat-title">Unique tags earned</div>
            <div className="stat-desc text-success">
              <CardTags
                tagsCount={tagAwards}
                badge={`sm badge-success`}
                key="tagAwards"
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg col-span-3 md:col-span-2">
          <div className="flex flex-row mt-4">
            <div className="basis-2/5 mr-3">
              <div className="text-8xl font-bold">{weekSinceCreated}</div>
              <div className="text-sm">
                Weeks since you're in <br /> the Fellowship program.
              </div>
            </div>
            <div className="basis-3/5">
              <CardEffortPoints effort={totalEffortEarned} />
            </div>
          </div>
        </div>
        <div className="divider mb-4">Program Goals</div>

        <SetTarget totalEffortEarned={totalEffortEarned} />

        {/* {JSON.stringify(user.target)}
        {JSON.stringify(user.watchlist)} */}
      </div>
    </div>
  );
};

export default Scoreboard;
