import { useState, useEffect, useContext, useRef } from "react";

import { UserContext } from "../../contexts/UserContext";

import CollectionModal from "../CollectionModal";
import CollectionDetails from "./CollectionDetails";
import CollectionMentors from "./CollectionMentors";
import CardEffortPoints from "./CardEffortPoints";

import addOrRemoveFromTray from "../Tray/addOrRemoveFromTray";
import CardActions from "./CardActions";

const CollectionCard = ({ attributes, id }) => {
  const { u, c, bc } = useContext(UserContext);
  const [user] = u;
  const [collection] = c;
  const [bookmarkedCollections, setBookmarkedCollections] = bc;
  const [bookmarkIcon, setBookmarkIcon] = useState(false);

  const dateRef = useRef(attributes.publishedAt);

  const { numArticles, numChallenges, numCourses, numVideos, tagsCount } =
    attributes;

  const numMaterials = {
    articles: numArticles,
    challenges: numChallenges,
    courses: numCourses,
    videos: numVideos,
  };

  const selectedTray = bookmarkedCollections.find(
    (collection) => collection.id === id
  );

  const handleAddToTray = () => {
    addOrRemoveFromTray(
      bookmarkedCollections,
      id,
      setBookmarkedCollections,
      user,
      collection
    );
    setBookmarkIcon((prev) => !prev);
  };

  useEffect(() => {
    let trayCollections = bookmarkedCollections.map(
      (collection) => collection.id
    );
    setBookmarkIcon(trayCollections.includes(id));

    console.log("bookmarkedCollections", bookmarkedCollections);

    // handle dates
    // const isoDate = new Date(attributes.publishedAt).toISOString();
    const isoDate = new Date(attributes.updatedAt).toISOString();
    dateRef.current = isoDate.substring(0, isoDate.indexOf("T"));
  }, [id, bookmarkedCollections, attributes.updatedAt]);

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
        <small>Last Updated on {dateRef.current}</small>
        {attributes.details && <CollectionDetails attributes={attributes} />}
        {attributes.experts && (
          <CollectionMentors mentors={attributes.experts.data} />
        )}
      </div>
      <div className="flex flex-row">
        <div className="basis-4/5">
          <CardActions
            bookmarkIcon={bookmarkIcon}
            num_materials={numMaterials}
            tagsCount={tagsCount}
            handleAddToTray={handleAddToTray}
            trayStatus={selectedTray?.status}
          />
        </div>
        <div className="basis-1/5">
          <div className="tooltip" data-tip="Effort Points">
            <CardEffortPoints
              effort={attributes.totalEffort}
              extraClass="badge-info"
            />
          </div>
        </div>
      </div>

      <CollectionModal
        collectionId={id}
        showSubmitButton={selectedTray?.status === "ongoing" ? true : false}
      />
    </div>
  );
};

export default CollectionCard;
