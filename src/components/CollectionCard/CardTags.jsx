import { tagClass } from "../../utils/constants";

const CardTags = ({ tagsCount, badge }) => {
  const result =
    typeof tagsCount === "object" &&
    Object.keys(tagsCount).map((tag) => {
      return (
        <div data-tip="Tag Award" className="tooltip" key={tag}>
          <div
            className={`badge ${badge === "sm" ? "badge-sm" : "badge-md"} ${
              Object.keys(tagClass).includes(tag)
                ? tagClass[tag]
                : tagClass["other"]
            } mx-1`}
          >
            {tagsCount[tag] > 1 ? `${tag} x ${tagsCount[tag]}` : tag}
          </div>
        </div>
      );
    });

  return result;
};

export default CardTags;
