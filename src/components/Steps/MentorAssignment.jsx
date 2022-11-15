import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import NotLoggedIn from "../Tray/NotLoggedIn";
import NoProMembership from "./NoProMembership";
import MentorAssignmentCard from "./MentorAssignmentCard";

const MentorAssignment = () => {
  // const { u, c, e } = useContext(UserContext);
  const { u, bc } = useContext(UserContext);
  const [user] = u;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;

  const ongoingLessons = useRef(
    bookmarkedCollections.filter((bc) => bc.status === "ongoing")
  );
  const requestedLessons = useRef(
    bookmarkedCollections.filter((bc) => bc.status === "requested")
  );

  useEffect(() => {
    console.log(bookmarkedCollections);
    console.log("u", user);
    console.log("bc", bc);
  }, [bookmarkedCollections, setBookmarkedCollections, user, bc]);

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
        <ul className="list-none">
          {ongoingLessons.current?.length > 0 &&
            ongoingLessons.current.map((lesson) => (
              <MentorAssignmentCard lesson={lesson} key={lesson.id} />
            ))}
        </ul>
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
                  token={user.token}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MentorAssignment;
