import { useContext, useState, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import CardTags from "../CollectionCard/CardTags";
import { LessonCardFrame } from "./MentorAssignmentCard";

import timeAgo from "./timeAgo";

const Fellowship = () => {
  const { u, ta, bc } = useContext(UserContext);
  const [tagAwards] = ta;
  const [bookmarkedCollections] = bc;
  const [user] = u;
  const [completedCollections, setCompletedCollections] = useState([]);
  const [totalEffortEarned, setTotalEffortEarned] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState([]);

  useEffect(() => {
    console.log(bookmarkedCollections);
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
        x.status,
        x.attributes.title,
        x.id,
        x.attributes.totalEffort,
      ])
    );
    bookmarkedCollections.forEach((x) =>
      val.push([
        x.tray_updated_at,
        x.status,
        x.attributes.title,
        x.id,
        x.attributes.totalEffort,
      ])
    );
    val.sort((a, b) => b[0].localeCompare(a[0]));

    // map first element of each array in val to timeAgo
    val = val.map((x) => {
      x[0] = timeAgo(new Date(x[0]).getTime());
      return x;
    });

    setTimelineEvents(val);

    // create a chronological list of completed collections
  }, [bookmarkedCollections]);

  useEffect(() => {
    // console.log(completedCollections);
    // get the total effort points earned
    let totalEffort = 0;
    completedCollections.forEach((collection) => {
      totalEffort += collection.attributes.totalEffort;
    });
    setTotalEffortEarned(totalEffort);
  }, [user, completedCollections]);

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
            {Object.keys(tagAwards).length > 0
              ? `You have earned ${
                  Object.keys(tagAwards).length
                } badge(s) 🥇 from ${completedCollections.length} lessons.`
              : `You have not earned any badges yet.`}
            <br />
            You have earned a total of {totalEffortEarned} effort points.
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

        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          <li class="mb-10 ml-6">
            <span class="absolute flex items-center justify-center w-8 h-8 bg-black rounded-full -left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </span>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                {timeAgo(new Date(user.createdAt).getTime())}
              </time>
              <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                Created an account on{" "}
                <span class="font-semibold text-white">
                  {new Date(user.createdAt).toDateString().replace(/\s+/, ", ")}
                </span>{" "}
                and earned{" "}
                <span class="font-semibold text-primary hover:underline">
                  1
                </span>{" "}
                effort point.
              </div>
            </div>
          </li>
          <li class="mb-10 ml-6">
            <span class="absolute flex items-center justify-center w-8 h-8 bg-black rounded-full -left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </span>
            <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
              <div class="items-center justify-between mb-3 sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  3 days ago
                </time>
                <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                  Bookmarked{" "}
                  <span class="font-semibold text-gray-900 dark:text-white hover:underline">
                    Cloud Engineering Fundamentals
                  </span>
                </div>
              </div>
              <div class="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                suscipit neque voluptas eius quod provident iste, tempore totam
                quos ipsa iusto ea! Molestiae reprehenderit est incidunt neque
                corporis harum. Esse?
              </div>
            </div>
          </li>
          <li class="ml-6">
            <span class="absolute flex items-center justify-center w-8 h-8 bg-black rounded-full -left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </span>
            <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                14 hours ago
              </time>
              <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                Completed{" "}
                <span class="font-semibold hover:underline">
                  SQL Essentials 2
                </span>{" "}
                on{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  2023-01-01
                </span>
                and earned{" "}
                <span class="font-semibold text-primary hover:underline">
                  5
                </span>{" "}
                effort points.
              </div>
            </div>
          </li>
        </ol>
        {JSON.stringify(timelineEvents)}
      </div>
    </div>
  );
};

export default Fellowship;
