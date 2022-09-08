import React from "react";

const CardEffortPoints = ({ effort, extraClass }) => {
  return (
    <div className="flex max-w-4xl flex-wrap items-center gap-2 overflow-x-hidden">
      {Array.from({ length: effort }, (_, i) => (
        // <span key={i} className={`badge badge-xs mx-1 ${color}`}></span>
        <div key={i} className={`badge badge-xs ${extraClass}`}></div>
      ))}
    </div>
  );
};

export default CardEffortPoints;
