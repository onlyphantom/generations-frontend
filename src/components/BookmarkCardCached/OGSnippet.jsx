import React from "react";

const OGSnippet = ({
  title,
  subtitle,
  description,
  url,
  imgUrl,
  medium,
  effort,
}) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl rounded-xl overflow-hidden">
      <div className="columns-xs md:flex">
        <figure className="shrink-0">
          <img
            src={imgUrl}
            alt={title}
            className="h-48 w-full object-cover md:h-full md:w-48"
            // style={{ width: 420 }}
          />
        </figure>
      </div>
      <div className="card-body text-sm text-white text-left p-6">
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
        <div className="flex">
          {Array.from({ length: effort }, (_, i) => (
            <span
              key={i}
              className="badge badge-secondary badge-xs mx-1"
            ></span>
          ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Add</button>
        </div>
      </div>
    </div>
  );
};

export default OGSnippet;
