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
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* <div className="my-4 w-3/4 max-w-2xl"> */}
        <TrayCourses
          bookmarkedCollections={bookmarkedCollections}
          setBookmarkedCollections={setBookmarkedCollections}
          user={user}
        />
        {/* </div> */}
      </div>
    );
  } else {
    return(
      <div className="flex items-center justify-center mt-4">
          <NoBookmarksYet />
      </div>
    );
  }
};

export default Curation;
