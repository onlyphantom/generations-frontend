import React from "react";
import OGSnippet from "./OGSnippet";

import { truncate } from "./utils";

const BookmarkCardCached = ({ data }) => {
  return (
    <div>
      <OGSnippet
        title={data.attributes.title}
        subtitle={data.attributes?.opengraph?.title}
        description={
          data.attributes.details ||
          truncate(data.attributes.opengraph?.description, 360)
        }
        url={data.attributes?.opengraph?.url || data.attributes.url}
        imgUrl={
          data.attributes?.opengraph?.image ||
          data.attributes?.opengraph?.imageSecureUrl
        }
        medium={data.attributes.medium}
        effort={data.attributes.effort}
        tagsCount={data.attributes.tagsCount}
      />
    </div>
  );
};

export default BookmarkCardCached;
