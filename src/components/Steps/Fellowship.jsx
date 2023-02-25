import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import CardTags from "../CollectionCard/CardTags";
import { LessonCardFrame } from "./MentorAssignmentCard";
import { AddIcon, CompleteIcon } from "../CollectionCard/CardActions";

import timeAgo from "./timeAgo";

const eventType = (s, mentorinfo) => {
  switch (s) {
    case "bookmarked":
      return "Bookmarked";
    case "completed":
      return "Completed";
    case "ongoing":
      return `${mentorinfo} started mentoring you for `;
    case "preaccept":
      return `Requested mentorship from ${mentorinfo} for `;
    default:
      return "Bookmarked";
  }
};

const TimelineIcon = ({ eventType }) => {
  switch (eventType) {
    case "bookmarked":
      return (
        <span className="absolute flex items-center justify-center w-8 h-8 text-secondary rounded-full rounded-full -left-4">
          <AddIcon />
        </span>
      );

    case "ongoing":
      return (
        <span className="absolute flex items-center justify-center w-8 h-8 text-info rounded-full -left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
          </svg>
        </span>
      );

    case "completed":
      return (
        <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4">
          <CompleteIcon />
        </span>
      );

    default:
      return (
        <span className="absolute flex items-center justify-center w-8 h-8 bg-success rounded-full -left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
  }
};

const Fellowship = () => {
  const { u, ta, bc } = useContext(UserContext);
  const [user] = u;
  const [tagAwards] = ta;
  const [bookmarkedCollections] = bc;
  const [completedCollections, setCompletedCollections] = useState([]);
  const [totalEffortEarned, setTotalEffortEarned] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState([]);

  useEffect(() => {
    // console.log(bookmarkedCollections);
    // filter bookmarkedCollections to get where status = completed

    setCompletedCollections(
      bookmarkedCollections.filter(
        (collection) => collection.status === "completed"
      )
    );
    let val = [];
    bookmarkedCollections.forEach((x) =>
      val.push([
        x.tray_created_at,
        "bookmarked",
        x.attributes?.title,
        x.id,
        null,
      ])
    );
    bookmarkedCollections.forEach((x) =>
      val.push([
        x.tray_updated_at,
        x.status,
        x.attributes?.title,
        x.id,
        x.attributes?.totalEffort,
        x.assigned_expert?.attributes.name,
      ])
    );
    console.log(bookmarkedCollections);

    // drop "requested" events
    val = val.filter((x) => x[1] !== "requested");
    val.sort(
      (a, b) => new Date(b[0]) - new Date(a[0]) || b[1]?.localeCompare(a[1])
    );
    // map first element of each array in val to timeAgo
    val = val.map((x) => {
      x[0] = new Date(x[0]).toDateString().replace(/\s+/, ", ");
      x[6] = timeAgo(new Date(x[0]).getTime());
      return x;
    });

    setTimelineEvents(val);
  }, [bookmarkedCollections]);

  useEffect(() => {
    // console.log(completedCollections);
    // get the total effort points earned
    // when user signs up, they get 1 point automatically
    let totalEffort = 1;
    completedCollections.forEach((collection) => {
      totalEffort += collection.attributes?.totalEffort;
    });
    setTotalEffortEarned(totalEffort);
  }, [completedCollections]);

  const FellowshipScoreAlert = () => {
    return (
      <div className="alert shadow-lg m-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-left font-light">
            As you complete lessons, you will earn points and badges.
            <br />{" "}
            {tagAwards && Object.keys(tagAwards).length > 0
              ? `You have earned ${
                  Object.keys(tagAwards).length
                } badge(s) 🥇 from ${completedCollections.length} electives.`
              : `You have not earned any badges yet.`}
            <br />
            You have earned {totalEffortEarned} effort points up to date.
          </span>
        </div>
        <div>
          <CardTags tagsCount={tagAwards} badge={`sm`} key="tagAwards" />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 text-white text-sm text-center font-bold leading-6 mt-4">
      <div className="p-4 rounded-lg px-2 col-span-3 lg:col-span-1">
        <h3 className="text-lg text-left mb-4">Achievements</h3>

        <div className="divider"></div>

        {completedCollections.length === 0 ? (
          <div>
            No completed collections yet.
            <br />
          </div>
        ) : (
          <ul className="list-none">
            {completedCollections.map((lesson) => {
              return (
                <LessonCardFrame lesson={lesson} key={lesson.id}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                    <span>Completed</span>
                  </span>
                </LessonCardFrame>
              );
            })}
          </ul>
        )}
      </div>
      <div className="p-4 rounded-lg shadow-lg col-span-3 md:col-span-2">
        <h3 className="text-lg text-left mb-4">Fellowship Progress Timeline</h3>
        <FellowshipScoreAlert />

        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {timelineEvents.map((event, index) => {
            return (
              <li className="mb-10 ml-7" key={index}>
                <TimelineIcon eventType={event[1]} />

                {/* <div className="items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600"></div> */}
                <div
                  className={`items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm sm:flex ${
                    event[1] === "completed" &&
                    "dark:bg-gray-700 dark:border-gray-600"
                  }`}
                >
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    {event[6]}
                  </time>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                    {eventType(event[1], event[5])} {event[2]} on{" "}
                    <span className="font-semibold text-white">{event[0]}</span>{" "}
                    {event[1] === "completed" && (
                      <div className="p-3 mt-2 text-left text-xs italic font-normal border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 text-success">
                        You earned{" "}
                        <span className="font-semibold text-primary hover:underline">
                          {event[4]}
                        </span>{" "}
                        effort points.
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-success rounded-full -left-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                {timeAgo(new Date(user.createdAt).getTime())}
              </time>
              <div className="font-normal text-gray-500 dark:text-gray-300">
                Created an account on{" "}
                <span className="font-semibold text-success">
                  {new Date(user.createdAt).toDateString().replace(/\s+/, ", ")}
                </span>
                <div className="p-3 mt-2 text-left text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-success">
                  You earned{" "}
                  <span className="font-semibold text-primary hover:underline">
                    1
                  </span>{" "}
                  effort point.
                </div>
              </div>
            </div>
          </li>
        </ol>
        {/* {JSON.stringify(timelineEvents)} */}
      </div>
    </div>
  );
};

export default Fellowship;
