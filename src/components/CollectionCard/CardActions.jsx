import React from "react";
import CardTags from "./CardTags";

export const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const AddedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" />
    </svg>
  );
};

export const CompleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 512"
      className="w-7 h-7"
    >
      <path d="M479.863 103.342c-.051-2.833-.096-5.279-.096-7.342h-80.835c1.56-34.617.512-64 .512-64H256.876a9.76 9.76 0 0 0-1 .056 9.728 9.728 0 0 0-1-.056H111.945s-1.048 29.383.512 64H32V128h.161c.811 26.096 4.98 60.999 22.333 96.729 14.718 30.307 35.912 55.664 62.996 75.367 22.422 16.312 48.041 28.064 76.205 35.084C209.96 352.539 226 362.109 240 365.957v35.625C238 412.165 225.86 448 141.234 448H128v32h256v-32h-13.178C271.538 448 272 398.666 272 398.666v-32.714c14-3.843 29.73-13.374 45.91-30.644 28.369-7.004 54.072-18.801 76.633-35.213 27.082-19.703 48.262-45.06 62.98-75.367 23.68-48.761 22.803-96.005 22.34-121.386zM83.262 210.745C68.802 180.966 65.018 150.996 64.187 128h50.487c.868 8.914 1.966 17.701 3.356 25.98 8.513 50.709 20.213 95.493 42.354 135.009-33.838-17.141-60.414-43.84-77.122-78.244zm345.475 0c-16.807 34.61-43.603 61.421-77.729 78.55 22.215-39.591 33.816-84.475 42.352-135.314 1.39-8.28 2.488-17.067 3.356-25.98h51.096c-.831 22.995-4.614 52.965-19.075 82.744z" />
    </svg>
  );
};

const ArticlesIcon = ({ count }) => {
  return (
    <div className="flex flex-col mr-4 tooltip" data-tip="Articles">
      <div className="bg-glass rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
        </svg>
      </div>
      <div className="text-sm">{count}</div>
    </div>
  );
};

const ChallengesIcon = ({ count }) => {
  return (
    <div className="flex flex-col mr-4 tooltip" data-tip="Challenges">
      <div className="bg-glass rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-sm">{count}</div>
    </div>
  );
};

const CoursesIcon = ({ count }) => {
  return (
    <div className="flex flex-col mr-4 tooltip" data-tip="Courses">
      <div className="bg-glass rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zm7.49-8.931a.75.75 0 01-.175 1.046 19.326 19.326 0 00-3.398 3.098.75.75 0 01-1.097.04L8.5 8.561l-2.22 2.22A.75.75 0 115.22 9.72l2.75-2.75a.75.75 0 011.06 0l1.664 1.663a20.786 20.786 0 013.122-2.74.75.75 0 011.046.176z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-sm">{count}</div>
    </div>
  );
};

const VideosIcon = ({ count }) => {
  return (
    <div className="flex flex-col mr-4 tooltip" data-tip="Videos">
      <div className="bg-glass rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
        </svg>
      </div>
      <div className="text-sm">{count}</div>
    </div>
  );
};

const MaterialCounts = ({ num_materials, tagsCount, trayStatus }) => {
  let content = [];

  if (num_materials.articles > 0) {
    content.push(
      <ArticlesIcon count={num_materials.articles} key="articles" />
    );
  }
  if (num_materials.challenges > 0) {
    content.push(
      <ChallengesIcon count={num_materials.challenges} key="challenges" />
    );
  }
  if (num_materials.courses > 0) {
    content.push(<CoursesIcon count={num_materials.courses} key="courses" />);
  }
  if (num_materials.videos > 0) {
    content.push(<VideosIcon count={num_materials.videos} key="videos" />);
  }
  if (Object.keys(tagsCount).length > 0) {
    content.push(<CardTags tagsCount={tagsCount} key="tagsCount" />);
  }

  return (
    <div className={`flex flex-row ${trayStatus !== "ongoing" ? "ml-4" : ""}`}>
      {content}
    </div>
  );
};

const CardActions = ({
  bookmarkIcon,
  num_materials,
  tagsCount,
  handleAddToTray,
  trayStatus,
}) => {
  return (
    <div className="card-actions">
      {trayStatus === "completed" ? (
        <button className="btn btn-disabled btn-square btn-solid hover:cursor-default">
          <CompleteIcon />
        </button>
      ) : trayStatus === "ongoing" || trayStatus === "preaccept" ? (
        <div className="tooltip" data-tip="Already enrolled in this lesson.">
          <button className="btn btn-square btn-disabled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#313742"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </div>
      ) : (
        <button
          className={`btn btn-square hover:animate-pulse ${
            !bookmarkIcon ? "btn-outline" : "btn-solid border-white"
          }`}
          onClick={handleAddToTray}
        >
          {!bookmarkIcon ? <AddIcon /> : <AddedIcon />}
        </button>
      )}

      <MaterialCounts
        num_materials={num_materials}
        tagsCount={tagsCount}
        trayStatus={trayStatus}
      />
    </div>
  );
};

export default CardActions;
