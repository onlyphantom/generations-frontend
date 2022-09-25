import React from "react";

const CardTags = ({ tagsCount, badge }) => {
  const tagClass = {
    postgresql: "badge-outline",
    python: "badge-primary",
    sql: "badge-secondary",
    r: "badge-info",
    react: "badge-ghost",
    django: "badge-error",
    other: "badge-warning",
  };

  const result =
    typeof tagsCount === "object" &&
    Object.keys(tagsCount).map((tag) => {
      return (
        <div data-tip="Tag Award" className="tooltip">
          <div
            className={`badge ${badge === "sm" ? "badge-sm" : "badge-md"} ${
              Object.keys(tagClass).includes(tag)
                ? tagClass[tag]
                : tagClass["other"]
            } mx-1`}
            key={tag}
          >
            {tagsCount[tag] > 1 ? `${tag} x ${tagsCount[tag]}` : tag}
          </div>
        </div>
      );
    });

  return result;
};

export default CardTags;
