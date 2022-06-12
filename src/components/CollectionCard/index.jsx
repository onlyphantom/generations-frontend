import React from "react";
import CollectionModal from "../CollectionModal";
import CollectionDetails from "./CollectionDetails";
import CollectionMentors from "./CollectionMentors";

const CollectionCard = ({ attributes, id }) => {
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
        {attributes.details && (
          <>
            <CollectionDetails attributes={attributes} />
            <CollectionMentors mentors={attributes.experts.data} />
          </>
        )}
      </div>
      <CollectionModal collectionId={id} />
    </div>
  );
};

export default CollectionCard;
