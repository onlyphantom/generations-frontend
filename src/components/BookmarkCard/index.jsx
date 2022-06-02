import React from "react";
import OpengraphReactComponent from "opengraph-react";

const BookmarkCard = ({ url }) => {
  return (
    <div>
      <p className="block rounded-lg shadow-lg bg-glass p-6 text-gray-800 bookmark-card">
        <OpengraphReactComponent
          site={url}
          appId={process.env.REACT_APP_OPENGRAPH_API_KEY}
          loader={
            <div>
              <progress className="progress w-56"></progress>
            </div>
          }
          size={"large"}
        />
      </p>
    </div>
  );
};

export default BookmarkCard;
