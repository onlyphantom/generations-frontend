import React from "react";
import TrayCard from "./TrayCard";

import { truncate } from "../BookmarkCardCached/utils";

const TrayContent = ({ tray, setTray }) => {

  const trayCourses = tray.map(course => {
    return (
      <div key={course.id}>
        <dt>{course.attributes.title}</dt>
        <dd>
          {
            course.attributes.details ||
            truncate(course.attributes.opengraph.description, 360)
          }
        </dd>
        <div className="divider"> - </div>
      </div>)
  })

  return (
    <div>
      <h2 className="mx-4">Learning Tray</h2>

      {tray.length === 0 ? (
        <p className="prose m-4">You have not added any lesson yet.</p>
      ) : (
        <>
          <dl>{trayCourses}</dl>
          <TrayCard setTray={setTray} />
          <TrayCard setTray={setTray} />
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
