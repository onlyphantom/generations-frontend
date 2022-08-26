import { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import CollectionModal from "../CollectionModal";
import CollectionDetails from "./CollectionDetails";
import CollectionMentors from "./CollectionMentors";

import addOrRemoveFromTray from "../Tray/addOrRemoveFromTray";

const CollectionCard = ({ attributes, id }) => {
  const { u, t } = useContext(UserContext);
  const [user] = u;
  const [tray, setTray] = t;
  const [bookmarkIcon, setBookmarkIcon] = useState(false);

  const handleAddToTray = () => {
    addOrRemoveFromTray(tray, id, setTray)
    setBookmarkIcon(prev => !prev)
  };

  return (
    <div
      className="block rounded-lg shadow-lg bg-base-200 p-6 bookmark-card  
      "
    >
      <h5 className="text-xl font-bold mb-2">
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
      <div className="card-actions">
        <button
          className={`btn btn-square ${!bookmarkIcon ? "btn-outline" : "btn-solid border-secondary"}`}
          onClick={handleAddToTray}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
      <CollectionModal collectionId={id} />
    </div>
  );
};

export default CollectionCard;
