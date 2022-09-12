import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import TrayCard from "./TrayCard";
import { AddIcon, AddedIcon } from "../CollectionCard/CardActions";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";

import { truncate } from "../BookmarkCardCached/utils";
import addOrRemoveFromTray from "./addOrRemoveFromTray";

const TrayContent = ({ tray, setTray }) => {
  const [trayIdArray, setTrayIdArray] = useState([]);

  useEffect(() => {
    setTrayIdArray(tray.map((t) => t.id));
  }, [tray]);

  const totalEffort = () => {
    let effortArray = tray.map((course) => {
      return course.attributes.totalEffort;
    });

    let sumEffort = effortArray.reduce((sum, x) => sum + x);
    return sumEffort;
  };

  const EffortWidget = () => {
    return (
      <CardEffortPoints effort={totalEffort()} extraClass={`badge-primary`} />
    );
  };

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
    <>
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
          <div className="rounded-lg m-4 border-accent border-2">
            <div className="mb-4 mt-2">
              <h2 className="prose prose-lg px-4">
                Expended Effort{" "}
                <div className="badge badge-md badge-accent">13</div>
                <div className="flex flex-row">
                  <div className="basis-3/5">
                    <div
                      className="radial-progress text-accent"
                      style={{ "--value": 70 }}
                    >
                      70%
                    </div>
                  </div>
                  <div className="basis-2/5">
                    <CardEffortPoints effort={13} extraClass={`badge-accent`} />
                    <div>
                      <div className="badge badge-sm mx-1">neutral</div>
                      <div className="badge badge-sm badge-primary mx-1">
                        python
                      </div>
                      <div className="badge badge-sm badge-secondary mx-1">
                        sql
                      </div>
                      <div className="badge badge-sm badge-accent mx-1">r</div>
                      <div className="badge badge-sm badge-ghost mx-1">
                        react
                      </div>
                      <div className="badge badge-sm badge-primary mx-1">
                        django
                      </div>
                    </div>
                  </div>
                </div>
              </h2>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="prose prose-lg m-4">
              Expected Effort{" "}
              <div className="badge badge-md badge-primary">
                {totalEffort()}
              </div>
              <EffortWidget />
            </h2>
          </div>

          <h2 className="prose prose-lg m-4">Pending Lessons</h2>
          <dl>{trayCourses}</dl>
          {/* <TrayCard setTray={setTray} />
          <TrayCard setTray={setTray} />  */}
        </>
      )}

      <p className="text-xs text-gray-500">
        {tray.length > 0 && JSON.stringify(tray[0])}
      </p>
      {/* <p className="text-xs text-gray-500">{JSON.stringify(tray)}</p> */}
    </>
  );
};

export default TrayContent;
