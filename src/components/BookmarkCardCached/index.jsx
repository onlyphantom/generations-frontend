import React from "react";
import OGSnippet from "./OGSnippet";

const BookmarkCardCached = ({ data }) => {
  return (
    <div>
      <OGSnippet
        title={data.attributes.title}
        subtitle={data.attributes.opengraph.title}
        description={
          data.attributes.details || data.attributes.opengraph.description
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
