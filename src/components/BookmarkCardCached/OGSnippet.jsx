import React from "react";

import CardEffortPoints from "../CollectionCard/CardEffortPoints";
import CardTags from "../CollectionCard/CardTags";

const OGSnippet = ({
  title,
  subtitle,
  description,
  url,
  imgUrl,
  medium,
  effort,
  tagsCount,
}) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl rounded-xl overflow-hidden w-full">
      <div className="columns-xs md:flex w-1/2">
        {imgUrl && (
          <div className="w-80 flex items-center">
            <img
              src={imgUrl}
              alt={title}
              // className="h-48 w-full object-cover"
              className="rounded-r-2xl shadow-lg h-auto"
            />
          </div>
        )}
      </div>
      <div className="w-full card-body text-sm text-white text-left p-6">
        <div className="uppercase tracking-wide text-sm text-secondary font-semibold">
          {medium}
        </div>
        <h2 className="card-title">
          <a href={url} target="_blank" rel="noreferrer" className="link">
            {title}
          </a>
        </h2>
        <p className="text-xs">{subtitle}</p>
        <p>{description}</p>
        {/* <div className="flex">
          {Array.from({ length: effort }, (_, i) => (
            <span
              key={i}
              className="badge badge-secondary badge-xs mx-1"
            ></span>
          ))}
        </div> */}
        <div className="flex flex-row">
          <div className="basis-3/5">
            <div className="tooltip" data-tip="Effort Points">
              <CardEffortPoints
                effort={effort}
                extraClass={`badge-secondary`}
              />
            </div>
          </div>
          <div className="basis-3/5 text-right">
            <CardTags tagsCount={tagsCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OGSnippet;
