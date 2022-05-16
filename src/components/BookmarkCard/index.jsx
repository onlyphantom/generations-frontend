import React, { useEffect } from "react";
import OpengraphReactComponent from "opengraph-react";

const BookmarkCard = ({ url, key }) => {
  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div>
      <h4>Bookmark Card</h4>
      <p>
        {url}
        <OpengraphReactComponent
          site={
            url || "https://docs.djangoproject.com/en/4.0/intro/tutorial01/"
          }
          appId={process.env.REACT_APP_OPENGRAPH_API_KEY}
          loader={<div>Loading...</div>}
          size={"large"}
        />
      </p>
    </div>
  );
};

export default BookmarkCard;
