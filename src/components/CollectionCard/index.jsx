import React from "react";
import ReactMarkdown from "react-markdown";

const CollectionCard = ({ attributes }) => {
  return (
    <div className="block rounded-lg shadow-lg bg-glass p-6 m-4 text-gray-800 bookmark-card">
      <h5 className="text-xl font-bold mb-2 text-gray-600">
        {attributes.title}
      </h5>
      <p className="text-gray-500 mb-4 text-sm markdown-para">
        <small>{attributes.publishedAt}</small>
        <hr />
        <ReactMarkdown>{attributes.details}</ReactMarkdown>
      </p>
    </div>
  );
};

export default CollectionCard;
