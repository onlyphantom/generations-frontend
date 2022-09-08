import React from "react";
import ReactMarkdown from "react-markdown";

import TrayCard from "./TrayCard";
import { AddedIcon } from "../CollectionCard/CardActions";

import { truncate } from "../BookmarkCardCached/utils";

const TrayContent = ({ tray, setTray }) => {
  const trayCourses = tray.map((course) => {
    return (
      <TrayCard key={course.id}>
        <dt>{course.attributes.title}</dt>
        <dd>
          <article className="prose prose-sm dark:prose-invert">
            <ReactMarkdown>
              {course.attributes.details ||
                truncate(course.attributes.opengraph.description, 360)}
            </ReactMarkdown>
          </article>
          <button
            className="btn btn-square"
            // TODO: obviously need to remove from tray, not just setTray
            onClick={setTray}
          >
            <AddedIcon />
          </button>
        </dd>
      </TrayCard>
    );
  });

  return (
    <div>
      {tray.length === 0 ? (
        <p className="prose m-4">You have not added any lesson yet.</p>
      ) : (
        <>
          <h2 className="prose prose-lg mx-auto w-full max-w-sm">
            Added Lessons
          </h2>
          <dl>{trayCourses}</dl>
          {/* <TrayCard setTray={setTray} />
          <TrayCard setTray={setTray} />  */}
        </>
      )}

      <p className="text-xs text-gray-500">
        {tray.length > 0 && JSON.stringify(tray[0])}
      </p>
      {/* <p className="text-xs text-gray-500">{JSON.stringify(tray)}</p> */}
    </div>
  );
};

export default TrayContent;
