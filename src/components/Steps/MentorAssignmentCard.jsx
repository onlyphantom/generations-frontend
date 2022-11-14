import React from "react";

const MentorProfile = ({ mentor }) => {
  return (
    <>
      <img
        src={mentor.imageURL}
        alt={mentor.name}
        className="mask mask-hexagon rounded-md filter grayscale sepia-25 self-center w-5 h-5 rounded-full mx-2"
      />

      <span className="font-bold">{mentor.name}</span>
    </>
  );
};

const AlreadyAssignedBtn = () => {
  return (
    <div className="tooltip" data-tip="You have a mentor for this lesson.">
      <button disabled className="btn gap-2 btn-disabled btn-block">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span className="text-xs">Assigned</span>
        </span>
      </button>
    </div>
  );
};

const ConfirmAssignmentBtn = () => {
  return (
    <button className="btn gap-2 btn-block">
      <span className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <span className="text-xs">Confirm</span>
      </span>
    </button>
  );
};

const MentorAssignmentCard = ({ lesson }) => {
  return (
    <div className="card bg-base-100 shadow-xl overflow-visible mb-4">
      <div className="card-body">
        <li className="gap-1">
          <div className="grid grid-cols-3 gap-1 items-center">
            <div className="text-left md:col-span-2 col-span-3">
              <h2 className="card-title">{lesson.attributes.title}</h2>

              {lesson.status === "ongoing" ? (
                <>
                  <p className="font-light">Assigned Mentor:</p>
                  <span className="flex items-center">
                    <MentorProfile mentor={lesson.assigned_expert.attributes} />
                  </span>
                </>
              ) : (
                <>
                  <p className="font-light">Suggested Mentor:</p>
                  <span className="flex items-center">
                    <MentorProfile
                      mentor={lesson.attributes?.recommendedExpert}
                    />
                  </span>
                </>
              )}
            </div>
            <div className="col-span-3 lg:col-span-1">
              {lesson.status === "ongoing" ? (
                <AlreadyAssignedBtn />
              ) : (
                <ConfirmAssignmentBtn />
              )}
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

export default MentorAssignmentCard;
