import React from "react";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";

const UserProgress = () => {
  return (
    <div className="rounded-lg m-4 border-accent border-2">
      <div className="mb-4 mt-2">
        <h2 className="prose prose-lg px-4">
          Expended Effort <div className="badge badge-md badge-accent">13</div>
          <div className="flex flex-row">
            <div className="basis-3/5">
              <div
                className="radial-progress text-accent"
                style={{ "--value": 70 }}
              >
                70%
              </div>
            </div>
            <div className="basis-2/5">
              <CardEffortPoints effort={13} extraClass={`badge-accent`} />
              <div>
                <div className="badge badge-sm badge-outline mx-1">
                  postgresql
                </div>
                <div className="badge badge-sm badge-primary mx-1">python</div>
                <div className="badge badge-sm badge-secondary mx-1">sql</div>
                <div className="badge badge-sm badge-info mx-1">r</div>
                <div className="badge badge-sm badge-ghost mx-1">react</div>
                <div className="badge badge-sm badge-error mx-1">django</div>
              </div>
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default UserProgress;
