import React from "react";

const TrayButton = ({ setTrayOpen }) => {
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 220,
        height: 100,
      }}
    >
      <div
        style={{
          position: "absolute",
        }}
      >
        <button
          onClick={() => setTrayOpen(true)}
          className="btn bg-info text-black link hover:bg-sky-500 glass shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
          Learning Tray
        </button>
      </div>
    </div>
  );
};

export default TrayButton;
