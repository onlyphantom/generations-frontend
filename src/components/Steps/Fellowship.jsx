import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import CardTags from "../CollectionCard/CardTags";
import { LessonCardFrame } from "./MentorAssignmentCard";

const Fellowship = () => {
  const { ta, bc } = useContext(UserContext);
  const [tagAwards] = ta;
  const [bookmarkedCollections] = bc;
  const [completedCollections, setCompletedCollections] = useState([]);

  useEffect(() => {
    console.log(bookmarkedCollections);
    // filter bookmarkedCollections to get where status = completed

    setCompletedCollections(
      bookmarkedCollections.filter(
        (collection) => collection.status === "completed"
      )
    );
  }, [bookmarkedCollections]);

  const FellowshipScoreAlert = () => {
    return (
      <div className="alert shadow-lg m-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-left font-light">
            Scoreboard is a quick way to see your progress and compare it to
            other peers in the same program.
            <br /> As you complete lessons, you will earn points and badges.
            <br />{" "}
            {Object.keys(tagAwards).length > 0
              ? `You have earned ${Object.keys(tagAwards).length} badge(s) 🥇.`
              : `You have not earned any badges yet.`}
          </span>
        </div>
        <div>
          <CardTags tagsCount={tagAwards} badge={`sm`} key="tagAwards" />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">Achievements</h3>

        <div className="divider"></div>

        {completedCollections.length === 0 ? (
          <div>
            No completed collections yet.
            <br />
          </div>
        ) : (
          <ul className="list-none">
            {completedCollections.map((lesson) => {
              return (
                <LessonCardFrame lesson={lesson} key={lesson.id}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                    <span>Completed</span>
                  </span>
                </LessonCardFrame>
              );
            })}
          </ul>
        )}
      </div>
      <div className="p-4 rounded-lg shadow-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">Current Scores</h3>
        <FellowshipScoreAlert />
      </div>
    </div>
  );
};

export default Fellowship;
