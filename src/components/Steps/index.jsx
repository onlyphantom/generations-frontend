import React from "react";

const Steps = () => {
  return (
    <div className="m-4 p-8 flex flex-col justify-center items-center">
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li className="step step-secondary">Curations</li>
        <li className="step step-secondary">Pick a Cohort</li>
        <li className="step">Registration</li>
        <li className="step">Work Placement</li>
      </ul>
    </div>
  );
};

export default Steps;
