import React from "react";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";
import CardTags from "../CollectionCard/CardTags";

const diagonalLine = {
  borderBottom: "2px solid var(--tw-prose-body)",
  width: "100%",
  transform: "rotate(7deg)",
  transformOrigin: "top left",
};

const UserProgress = ({ tagAwards, expendedEffort }) => {
  const RadialProgess = () => {
    if (expendedEffort > 0) {
      return (
        <div
          className="radial-progress text-accent"
          style={{ "--value": expendedEffort * 4 }}
        >
          {`${expendedEffort * 4}%`}
        </div>
      );
    } else {
      return (
        <div className="alert shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="prose prose-slate prose-sm leading-snug">
              <small>
                As you complete lessons, your mentor will reward you with points
                and competency tags that will appear here.
              </small>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="rounded-lg m-4 border-accent border-2">
      <div className="mb-4 mt-2">
        <h2 className="prose prose-lg px-4">
          Scoreboard{" "}
          <div className="badge badge-md badge-accent">{expendedEffort}</div>
          <div className="flex flex-row">
            <div className="basis-3/5 mr-3">
              <RadialProgess />
            </div>
            <div className="basis-2/5">
              {expendedEffort > 0 ? (
                <CardEffortPoints
                  effort={expendedEffort}
                  extraClass={`badge-accent`}
                />
              ) : (
                <>
                  <div style={diagonalLine}></div>
                  <CardEffortPoints effort={20} />
                  <p className="prose prose-slate prose-sm leading-snug">
                    <small>You haven't accummulated any points.</small>
                  </p>
                </>
              )}

              <div>
                <CardTags tagsCount={tagAwards} badge={`sm`} key="tagAwards" />
              </div>
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default UserProgress;
