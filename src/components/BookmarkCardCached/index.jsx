import React from "react";
import OGSnippet from "./OGSnippet";

function truncate(s, maxLength) {
  if (s.length > maxLength) {
    return s.substring(0, maxLength) + "...";
  }
  return s;
}

const BookmarkCardCached = ({ data }) => {
  return (
    <div>
      <OGSnippet
        title={data.attributes.title}
        subtitle={data.attributes.opengraph.title}
        description={
          data.attributes.details ||
          truncate(data.attributes.opengraph.description, 360)
        }
        url={data.attributes.opengraph.url}
        imgUrl={
          data.attributes.opengraph.image ||
          data.attributes.opengraph.imageSecureUrl
        }
        medium={data.attributes.medium}
        effort={data.attributes.effort}
      />
      {/* <small>{JSON.stringify(data)}</small> */}
    </div>
  );
};

export default BookmarkCardCached;
