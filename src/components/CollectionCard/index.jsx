import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import CollectionModal from "../CollectionModal";
import CollectionDetails from "./CollectionDetails";
import CollectionMentors from "./CollectionMentors";

import addOrRemoveFromTray from "../Tray/addOrRemoveFromTray";
import CardActions from "./CardActions";

const CollectionCard = ({ attributes, id }) => {
  // const { u, t } = useContext(UserContext);
  // const [user] = u;
  const { t } = useContext(UserContext);
  const [tray, setTray] = t;
  const [bookmarkIcon, setBookmarkIcon] = useState(false);

  const { numArticles, numChallenges, numCourses, numVideos } = attributes;

  const numMaterials = {
    articles: numArticles,
    challenges: numChallenges,
    courses: numCourses,
    videos: numVideos,
  };

  const handleAddToTray = () => {
    addOrRemoveFromTray(tray, id, setTray);
    setBookmarkIcon((prev) => !prev);
  };

  return (
    <div
      className="block rounded-lg shadow-lg bg-base-200 p-6 bookmark-card  
      "
    >
      <h5 className="text-2xl font-bold mb-2">
        <label htmlFor={id} className="link">
          {attributes.title}
        </label>
      </h5>
      <div className="text-gray-500 mb-4 text-sm markdown-para">
        <small>{attributes.publishedAt}</small>
        {/* <small>{JSON.stringify(attributes)}</small> */}
        {attributes.details && <CollectionDetails attributes={attributes} />}
        {attributes.experts && (
          <CollectionMentors mentors={attributes.experts.data} />
        )}
      </div>
      <CardActions
        bookmarkIcon={bookmarkIcon}
        num_materials={numMaterials}
        handleAddToTray={handleAddToTray}
      />
      <CollectionModal collectionId={id} />
    </div>
  );
};

export default CollectionCard;
