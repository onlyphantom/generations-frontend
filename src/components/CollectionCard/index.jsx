import React from "react";
import ReactMarkdown from "react-markdown";

const CollectionCard = ({ attributes }) => {
  return (
    <div className="block rounded-lg shadow-lg bg-glass p-6 text-gray-800 bookmark-card">
      <h5 className="text-xl font-bold mb-2 text-gray-600">
        {attributes.title}
      </h5>
      <p className="text-gray-500 mb-4 text-sm markdown-para">
        <small>{attributes.publishedAt}</small>
        <hr />
        {attributes.details && (
          <div
            tabindex="0"
            class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div class="collapse-title text-xl font-medium">See Details</div>
            <div class="collapse-content">
              <article class="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{attributes.details}</ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </p>
    </div>
  );
};

export default CollectionCard;
