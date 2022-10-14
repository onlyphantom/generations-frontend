import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";

import { UserContext } from "../../contexts/UserContext";

import TrayCard from "./TrayCard";
import { AddIcon, AddedIcon } from "../CollectionCard/CardActions";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";

import { truncate } from "../BookmarkCardCached/utils";
import addOrRemoveFromTray from "./addOrRemoveFromTray";
import UserProgress from "./UserProgress";

export const TrayCourses = ({ trayCollections, tray, setTray, user, status }) => {

  const filteredTrayCollections = status ? trayCollections?.filter(tray => tray.status === status) : trayCollections;

  return filteredTrayCollections?.map((course) => {
    return (
      <TrayCard key={course.id}>
        <dt>
          {course.attributes?.title} <small>({course.status})</small>
        </dt>
        <dd>
          <article className="prose prose-sm dark:prose-invert">
            <ReactMarkdown>
              {truncate(course.attributes?.details || "", 240)}
            </ReactMarkdown>
          </article>
          {
            course.status === "requested" ? (
              <button
                className="btn btn-square"
                onClick={() => addOrRemoveFromTray(tray, course.id, setTray, user)}
              >
                <AddedIcon />
              </button>
            ) : (null)
          }
          
        </dd>
      </TrayCard>
    );
  });
};

const TrayContent = ({
  trayCollections,
  tray,
  setTray,
  tagAwards,
  expendedEffort,
}) => {
  const { u } = useContext(UserContext);
  const [user] = u;

  const totalEffort = (status) => {
    let filteredTrayCollections = trayCollections?.filter(tray => tray.status === status);

    let effortArray = filteredTrayCollections?.map((course) => {
      return course.attributes?.totalEffort;
    });

    let sumEffort = effortArray?.reduce((sum, x) => sum + x, 0);
    return sumEffort;
  };

  const EffortWidget = () => {
    return (
      <CardEffortPoints effort={totalEffort()} extraClass={`badge-primary`} />
    );
  };

  return (
    <>
      <UserProgress tagAwards={tagAwards} expendedEffort={expendedEffort} />

      {trayCollections.length === 0 ? (
        <p className="prose m-4">
          You have not added any lesson yet. You should{" "}
          <span className="inline-flex border rounded p-1">
            add <AddIcon />
          </span>{" "}
          a lesson that you're interested in, and check the Learning Tray again.
        </p>
      ) : (
        <>
          <h2 className="prose prose-lg mx-4">Ongoing Lessons</h2>
          <h3 className="prose prose-md mx-4">
            Expected Effort{" "}
            <div className="badge badge-md badge-primary">{totalEffort("ongoing")}</div>
            <EffortWidget />
          </h3>

          <dl>
            <TrayCourses
              trayCollections={trayCollections}
              tray={tray}
              setTray={setTray}
              user={user}
              status="ongoing"
            />
          </dl>

          <h2 className="prose prose-lg mx-4">Pending Lessons</h2>
          <dl>
            <TrayCourses
              trayCollections={trayCollections}
              tray={tray}
              setTray={setTray}
              user={user}
              status="requested"
            />
          </dl>
        </>
      )}

      <p className="text-xs text-gray-500">
        {trayCollections.length > 0 && JSON.stringify(trayCollections[0])}
      </p>
      {/* <p className="text-xs text-gray-500">{JSON.stringify(tray)}</p> */}
    </>
  );
};

export default TrayContent;
