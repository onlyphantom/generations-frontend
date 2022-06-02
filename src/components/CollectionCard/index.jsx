import React from "react";
import ReactMarkdown from "react-markdown";
import BookmarkModal from "../BookmarkModal";

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
        {attributes.details && (
          <div
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">Summary</div>
            <div className="collapse-content">
              <article className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{attributes.details}</ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </div>
      <BookmarkModal collectionId={id} />
    </div>
  );
};

export default CollectionCard;
