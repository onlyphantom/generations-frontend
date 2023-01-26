import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import CardTags from "../CollectionCard/CardTags";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";

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
    // when user signs up, they get 1 point for signing up
    let totalEffort = 1;
    completedCollections.forEach((collection) => {
      totalEffort += collection.attributes.totalEffort;
    });
    setTotalEffortEarned(totalEffort);

    // calculate points per week
    const today = new Date();
    const userCreatedDate = new Date(user.createdAt);

    const weeksSinceUserCreated = Math.round(
      (today - userCreatedDate) / (1000 * 60 * 60 * 24 * 7)
    );
    setWeekSinceCreated(weeksSinceUserCreated);

    const pointsPerWeek = (totalEffort / weeksSinceUserCreated).toFixed(2);
    console.log(pointsPerWeek);
    console.log(totalEffort);
    setPointsPerWeek(pointsPerWeek);
  }, [completedCollections, user.createdAt]);

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg shadow-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">
          Learn to Earn{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
        </h3>
        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title">Total Payouts</div>
            <div className="stat-value">{user.earnings.length}</div>
            <div className="stat-desc">
              Since joining on {user.createdAt.slice(0, 10)}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Earnings (IDR)</div>
            <div className="stat-value">
              {user.earnings
                .reduce((sum, curr) => sum + Number(curr.amount), 0)
                .toLocaleString()}
            </div>
            <div className="stat-actions">
              <button className="btn btn-sm">View History</button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">
          Key Statistics{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
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
            <div className="stat-value">{Object.keys(tagAwards).length}</div>
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

        {/* add Radial Progress */}
        <div className="p-4 rounded-lg col-span-3 md:col-span-2">
          {/* two divs next to each other */}
          <div className="flex flex-row mt-4">
            <div className="basis-2/5 mr-3">
              <div className="text-8xl font-bold">{weekSinceCreated}</div>
              <div className="text-sm">
                Weeks since you're in <br /> the Fellowship program.
              </div>
            </div>
            <div className="basis-3/5">
              <CardEffortPoints
                effort={totalEffortEarned}
                extraClass={`badge-accent`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
