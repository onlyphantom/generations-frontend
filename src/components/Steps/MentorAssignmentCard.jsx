import { useState } from "react";
import selectMentor from "./selectMentor";

const MentorProfile = ({ mentor }) => {
  return (
    <>
      <img
        src={mentor?.imageURL}
        alt={mentor?.name}
        className="mask mask-hexagon rounded-md filter grayscale sepia-25 self-center w-5 h-5 rounded-full mx-2"
      />

      <span className="font-bold">{mentor?.name}</span>
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

const ConfirmAssignmentBtn = ({
  trayId,
  expertId,
  user,
  bookmarkedCollections,
  setBookmarkedCollections,
}) => {
  const [btnEnable, setBtnEnable] = useState(true);

  return (
    <button
      className={`btn gap-2 btn-block hover:animate-pulse ${
        !btnEnable && "btn-disabled loading"
      }`}
      onClick={() => {
        setBtnEnable(false);
        selectMentor(
          trayId,
          expertId,
          user,
          bookmarkedCollections,
          setBookmarkedCollections
        );
      }}
    >
      <span className="flex items-center">
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
            d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
          />
        </svg>

        <span className="text-xs ml-2">Confirm</span>
      </span>
    </button>
  );
};

const MentorAssignmentCard = ({
  lesson,
  user,
  bookmarkedCollections,
  setBookmarkedCollections,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl overflow-visible mb-4">
      <div className="card-body">
        <li className="gap-1">
          <div className="grid grid-cols-3 gap-1 items-center">
            <div className="text-left md:col-span-2 col-span-3">
              <h2 className="card-title">{lesson.attributes.title}</h2>

              {lesson.status === "ongoing" || lesson.status === "preaccept" ? (
                <>
                  <p className="font-light">Assigned Mentor:</p>
                  <span className="flex items-center">
                    <MentorProfile
                      mentor={lesson.assigned_expert?.attributes}
                    />
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
            {/* TODO: need to handle cases when there is no available expert */}
            <div className="col-span-3 lg:col-span-1">
              {lesson.status === "ongoing" ? (
                <AlreadyAssignedBtn />
              ) : lesson.status === "preaccept" ? (
                <span className="flex items-center">
                  <span className="text-xs ml-2 prose prose-slate">
                    Waiting for confirmation
                  </span>
                </span>
              ) : (
                <ConfirmAssignmentBtn
                  trayId={lesson.trayId}
                  expertId={lesson.attributes?.recommendedExpert?.id}
                  user={user}
                  bookmarkedCollections={bookmarkedCollections}
                  setBookmarkedCollections={setBookmarkedCollections}
                />
              )}
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

export default MentorAssignmentCard;