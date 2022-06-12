import React from "react";

const CollectionMentors = ({ mentors }) => {
  return (
    <div className="avatar-group -space-x-6 mt-4">
      {mentors.map((mentor, i) => (
        <div className="avatar" key={i}>
          <div className="w-12 cursor-help" data-tip={mentor.attributes.name}>
            <img
              src={mentor.attributes.imageURL}
              alt={mentor.attributes.name}
              title={mentor.attributes.name}
              //   className="filter grayscale sepia-25"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionMentors;
