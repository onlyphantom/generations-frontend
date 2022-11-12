import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import NotLoggedIn from "../Tray/NotLoggedIn";

const MentorAssignment = () => {
  // const { u, e } = useContext(UserContext);
  const { u, bc } = useContext(UserContext);
  const [user] = u;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;

  const ongoingLessons = useRef(
    bookmarkedCollections.filter((bc) => bc.status === "ongoing")
  );

  useEffect(() => {
    console.log(bookmarkedCollections);
  }, [bookmarkedCollections, setBookmarkedCollections]);

  if (!user?.token) {
    return (
      <div className="mt-4">
        <NotLoggedIn />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg bg-sky-800 text-sky-300 font-mono ">
        <h3 className="text-lg">Ongoing Lessons</h3>
        <ul className="list-none">
          {ongoingLessons.current?.length > 0 &&
            ongoingLessons.current.map((lesson) => (
              <li key={lesson.id} className="gap-1">
                <div className="grid grid-cols-2 gap-1 mt-4">
                  <div className="text-left">
                    <h5 className="text-lg">{lesson.attributes.title}</h5>
                    <p className="text-xs">
                      Mentor:
                      <br />
                      {lesson.assigned_expert.attributes.name}
                    </p>
                  </div>
                  <div
                    className="tooltip"
                    data-tip="You already have a mentor assigned for this lesson."
                  >
                    <button
                      disabled
                      className="btn gap-2 btn-disabled  btn-secondary btn-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#005983"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Assigned
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="p-4 rounded-lg shadow-lg bg-sky-500 col-span-2">
        <h3 className="text-lg">Pending Lessons</h3>
      </div>
    </div>
  );
};

export default MentorAssignment;
