import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";

import { UserContext } from "../../contexts/UserContext";

import TrayCard from "./TrayCard";
import {
  AddIcon,
  AddedIcon,
  CompleteIcon,
} from "../CollectionCard/CardActions";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";

import { truncate } from "../BookmarkCardCached/utils";
import addOrRemoveFromTray from "./addOrRemoveFromTray";
import UserProgress from "./UserProgress";

export const TrayCourses = ({
  bookmarkedCollections,
  setBookmarkedCollections,
  user,
  status
}) => {

  const { c } = useContext(UserContext);
  const [collection] = c;

  const filteredBookmarkedCollections = status
    ? bookmarkedCollections?.filter((tray) => tray.status === status)
    : bookmarkedCollections;
  
  return filteredBookmarkedCollections?.map((course) => {
    return (
      <TrayCard key={course.id}>
        <dt>
          {course.attributes?.title}{" "}
          {/* <small>({course.assigned_expert || course.status})</small> */}
          <small>({course.status})</small>
        </dt>
        <dd>
          <article className="prose prose-sm dark:prose-invert">
            <ReactMarkdown>
              {truncate(course.attributes?.details || "", 240)}
            </ReactMarkdown>
          </article>
          {course.status === "requested" ? (
            <button
              className="btn btn-square"
              onClick={() =>
                addOrRemoveFromTray(bookmarkedCollections, course.id, setBookmarkedCollections, user, collection)
              }
            >
              <AddedIcon />
            </button>
          ) : course.status === "completed" ? (
            <button className="btn btn-square btn-solid hover:cursor-default">
              <CompleteIcon />
            </button>
          ) : null}
        </dd>
      </TrayCard>
    );
  });
};

const TrayContent = ({
  bookmarkedCollections,
  setBookmarkedCollections,
  tagAwards,
  expendedEffort,
}) => {
  const { u } = useContext(UserContext);
  const [user] = u;

  const totalEffort = (status) => {
    let filteredBookmarkedCollections = bookmarkedCollections?.filter(
      (tray) => tray.status === status
    );

    let effortArray = filteredBookmarkedCollections?.map((course) => {
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

      {bookmarkedCollections.length === 0 ? (
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
            <div className="badge badge-md badge-primary">
              {totalEffort("ongoing")}
            </div>
            <EffortWidget />
          </h3>

          <dl>
            <TrayCourses
              bookmarkedCollections={bookmarkedCollections}
              setBookmarkedCollections={setBookmarkedCollections}
              user={user}
              status="ongoing"
            />
          </dl>

          <h2 className="prose prose-lg mx-4">Pending Lessons</h2>
          <dl>
            <TrayCourses
              bookmarkedCollections={bookmarkedCollections}
              setBookmarkedCollections={setBookmarkedCollections}
              user={user}
              status="requested"
            />
          </dl>
        </>
      )}

      <p className="text-xs text-gray-500">
        {bookmarkedCollections.length > 0 && JSON.stringify(bookmarkedCollections[0])}
      </p>
    </>
  );
};

export default TrayContent;
