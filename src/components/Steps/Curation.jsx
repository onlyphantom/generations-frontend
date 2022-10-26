import NoBookmarksYet from "./NoBookmarksYet";
import { TrayCourses } from "../Tray/TrayContent";

const Curation = ({ setCurrentStep, bc, tray, setTray, u }) => {
  if (bc.length > 0) {
    return (
      <div className="my-4 w-3/4 max-w-2xl">
        <TrayCourses
          trayCollections={bc}
          tray={tray}
          setTray={setTray}
          user={u}
        />
      </div>
    );
  } else {
    return <NoBookmarksYet />;
  }
};

export default Curation;
