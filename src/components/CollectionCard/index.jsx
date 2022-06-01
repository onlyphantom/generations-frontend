import React from "react";
import ReactMarkdown from "react-markdown";
import BookmarkModal from "../BookmarkModal";

const CollectionCard = ({ attributes, id }) => {
  return (
    <li
      className="block rounded-lg shadow-lg bg-base-200 p-6 bookmark-card  
      "
    >
      <h5 className="text-xl font-bold mb-2">
        <label for={id} className="link">
          {attributes.title}
        </label>
      </h5>
      <p className="text-gray-500 mb-4 text-sm markdown-para">
        <small>{attributes.publishedAt}</small>
        {attributes.details && (
          <div
            tabindex="0"
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
      </p>
      <BookmarkModal collectionId={id} />
    </li>
  );
};

export default CollectionCard;
