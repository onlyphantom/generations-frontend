import React from "react";

const CardEffortPoints = ({ effort, extraClass }) => {
  /* every increment of 10 in effort */

  if (extraClass === undefined) {
    extraClass = "badge-accent";
  }

  let remaining = effort;
  let elemToBeRendered = [];

  while (remaining > 0) {
    let n = Math.min(remaining, 10);
    // reduce remaining by n
    remaining -= n;

    elemToBeRendered.push(
      <>
        <div className="flex mt-4 max-w-4xl flex-wrap items-center gap-2 overflow-x-hidden">
          {Array.from({ length: n }, (_, i) => (
            // <span key={i} className={`badge badge-xs mx-1 ${color}`}></span>
            <div key={i} className={`badge badge-xs ${extraClass}`}></div>
          ))}
          {/* break a new line if n is 10 otherwise add some paddings*/}
          {n !== 10 &&
            Array.from({ length: Math.ceil(n / 10) * 10 - n }, (_, i) => (
              <div key={i} className={`badge badge-xs`}></div>
            ))}
        </div>
      </>
    );
  }

  return elemToBeRendered;
};

export default CardEffortPoints;
