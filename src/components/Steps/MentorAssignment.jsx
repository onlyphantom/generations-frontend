import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import NotLoggedIn from "../Tray/NotLoggedIn";
import NoProMembership from "./NoProMembership";
import MentorAssignmentCard from "./MentorAssignmentCard";

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
          <ul className="list-none">
            {requestedLessons.current?.length > 0 &&
              requestedLessons.current.map((lesson) => (
                <MentorAssignmentCard
                  lesson={lesson}
                  key={lesson.id}
                  user={user}
                  bookmarkedCollections={bookmarkedCollections}
                  setBookmarkedCollections={setBookmarkedCollections}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MentorAssignment;
