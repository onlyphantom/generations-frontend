import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import NotLoggedIn from "../Tray/NotLoggedIn";
import NoProMembership from "./NoProMembership";
import MentorAssignmentCard from "./MentorAssignmentCard";

const MentorAssignmentAlert = () => {
  return (
    <div className="alert alert-warning shadow-lg m-4">
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
          Confirming a mentor assignment will queue the lesson and represents an
          actual time investment between you and your mentor. <br />
          Please make sure you are <b>ready to commit</b> to the lesson and be
          respectful of your mentor's time.
        </span>
      </div>
    </div>
  );
};

const MentorAssignment = () => {
  const { u, bc } = useContext(UserContext);
  const [user] = u;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;

  const ongoingLessons = useRef(
    bookmarkedCollections.filter((b) => b.status === "ongoing")
  );
  const requestedLessons = useRef(
    bookmarkedCollections.filter((b) => b.status === "requested")
  );
  const preacceptLessons = useRef(
    bookmarkedCollections.filter((b) => b.status === "preaccept")
  );

  useEffect(() => {
    console.log(bookmarkedCollections);
    ongoingLessons.current = bookmarkedCollections.filter(
      (b) => b.status === "ongoing"
    );
    requestedLessons.current = bookmarkedCollections.filter(
      (b) => b.status === "requested"
    );
    preacceptLessons.current = bookmarkedCollections.filter(
      (b) => b.status === "preaccept"
    );
  }, [bookmarkedCollections]);

  if (!user?.token) {
    return (
      <div className="mt-4">
        <NotLoggedIn />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">Ongoing Lessons</h3>

        {ongoingLessons.current?.length > 0 && (
          <ul className="list-none">
            {ongoingLessons.current.map((lesson) => (
              <MentorAssignmentCard lesson={lesson} key={lesson.id} />
            ))}
          </ul>
        )}

        {preacceptLessons.current?.length > 0 && (
          <>
            <div className="divider">Waiting for Acceptance</div>
            <ul className="list-none">
              {preacceptLessons.current.map((lesson) => (
                <MentorAssignmentCard lesson={lesson} key={lesson.id} />
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="p-4 rounded-lg shadow-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">Pending Lessons</h3>
        {!user.proUser ? (
          <NoProMembership />
        ) : (
          <>
            {requestedLessons.current?.length > 0 && (
              <>
                {/* showing the following only to relatively new users */}
                {ongoingLessons.current?.length < 2 && (
                  <MentorAssignmentAlert />
                )}

                <ul className="list-none">
                  {requestedLessons.current.map((lesson) => (
                    <MentorAssignmentCard
                      lesson={lesson}
                      key={lesson.id}
                      user={user}
                      bookmarkedCollections={bookmarkedCollections}
                      setBookmarkedCollections={setBookmarkedCollections}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MentorAssignment;
