import React, { useEffect } from "react";
import OpengraphReactComponent from "opengraph-react";

const BookmarkCard = ({ url, key }) => {
  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div>
      <p className="block rounded-lg shadow-lg bg-glass p-6 m-4 text-gray-800 bookmark-card">
        <OpengraphReactComponent
          site={url}
          appId={process.env.REACT_APP_OPENGRAPH_API_KEY}
          loader={<div>Loading...</div>}
          size={"large"}
        />
      </p>
    </div>
  );
};

export default BookmarkCard;
