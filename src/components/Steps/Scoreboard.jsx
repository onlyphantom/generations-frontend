import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import CardTags from "../CollectionCard/CardTags";

const Scoreboard = () => {
  const { u, ta, bc } = useContext(UserContext);
  const [user] = u;
  const [tagAwards] = ta;
  const [bookmarkedCollections] = bc;
  const [completedCollections, setCompletedCollections] = useState([]);

  const [totalEffortEarned, setTotalEffortEarned] = useState(0);

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
  }, [completedCollections]);

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg shadow-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">Total Effort Points</h3>
        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title">Total Payouts</div>
            <div className="stat-value">{2}</div>
            <div className="stat-desc">
              Since joining on {user.createdAt.slice(0, 10)}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Earnings (IDR)</div>
            <div className="stat-value">{(6000000).toLocaleString()}</div>
            <div className="stat-actions">
              <button className="btn btn-sm">View History</button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">Key Statistics</h3>
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
            <div className="stat-desc">avg +0.8 points/month</div>
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
      </div>
    </div>
  );
};

export default Scoreboard;
