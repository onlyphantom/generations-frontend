import React from "react";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";
import CardTags from "../CollectionCard/CardTags";

const UserProgress = ({ tagAwards, expendedEffort }) => {
  return (
    <div className="rounded-lg m-4 border-accent border-2">
      <div className="mb-4 mt-2">
        <h2 className="prose prose-lg px-4">
          Expended Effort <div className="badge badge-md badge-accent">{expendedEffort}</div>
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
              <CardEffortPoints effort={expendedEffort} extraClass={`badge-accent`} />
              <div>
                <CardTags tagsCount={tagAwards} badge={`sm`} key="tagAwards"/>
              </div>
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default UserProgress;
