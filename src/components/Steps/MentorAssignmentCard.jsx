import React from "react";

const MentorAssignmentCard = ({ lesson }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <li key={lesson.id} className="gap-1">
          <div className="grid grid-cols-2 gap-1 items-center">
            <div className="text-left">
              <h2 className="card-title">{lesson.attributes.title}</h2>
              <p className="font-light">Assigned Mentor:</p>
              <span className="flex items-center">
                <img
                  src={lesson.assigned_expert.attributes.imageURL}
                  alt={lesson.assigned_expert.attributes.name}
                  className="mask mask-hexagon rounded-md filter grayscale sepia-25 self-center w-5 h-5 rounded-full mx-2"
                  //   style={{ maxWidth: 150 }}
                />

                <span className="font-bold">
                  {lesson.assigned_expert.attributes.name}
                </span>
              </span>
            </div>
            <div
              className="tooltip"
              data-tip="You have a mentor for this lesson."
            >
              <button
                disabled
                className="btn gap-2 btn-disabled btn-secondary btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#313742"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="mt-1">Assigned</span>
              </button>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

export default MentorAssignmentCard;
