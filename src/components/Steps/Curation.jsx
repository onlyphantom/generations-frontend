import NoBookmarksYet from "./NoBookmarksYet";
import { TrayCourses } from "../Tray/TrayContent";

const Curation = ({
  setCurrentStep,
  bookmarkedCollections,
  setBookmarkedCollections,
  user,
}) => {
  if (bookmarkedCollections.length > 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="my-4 w-3/4 max-w-2xl">
          <TrayCourses
            bookmarkedCollections={bookmarkedCollections}
            setBookmarkedCollections={setBookmarkedCollections}
            user={user}
          />
        </div>
      </div>
    );
  } else {
    return <NoBookmarksYet />;
  }
};

export default Curation;
