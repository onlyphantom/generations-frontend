import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import TrayCard from "./TrayCard";
import { AddIcon, AddedIcon } from "../CollectionCard/CardActions";

import { truncate } from "../BookmarkCardCached/utils";
import addOrRemoveFromTray from "./addOrRemoveFromTray";

const TrayContent = ({ tray, setTray }) => {
  const [trayIdArray, setTrayIdArray] = useState([]);

  useEffect(() => {
    setTrayIdArray(tray.map((t) => t.id));
  }, [tray]);

  const trayCourses = tray.map((course) => {
    return (
      <TrayCard key={course.id}>
        <dt>{course.attributes.title}</dt>
        <dd>
          <article className="prose prose-sm dark:prose-invert">
            <ReactMarkdown>
              {truncate(course.attributes.details || "", 240)}
            </ReactMarkdown>
          </article>
          <button
            className="btn btn-square"
            onClick={() => addOrRemoveFromTray(trayIdArray, course.id, setTray)}
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
        <p className="prose m-4">
          You have not added any lesson yet. You should{" "}
          <span className="inline-flex border rounded p-1">
            add <AddIcon />
          </span>{" "}
          a lesson that you're interested in, and check the Learning Tray again.
        </p>
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
