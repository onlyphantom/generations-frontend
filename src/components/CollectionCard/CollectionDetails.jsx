import React from "react";
import ReactMarkdown from "react-markdown";

const CollectionDetails = ({ attributes }) => {
  return (
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
  );
};

export default CollectionDetails;
