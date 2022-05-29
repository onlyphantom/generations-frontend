import React from "react";

const IntentRow = ({ intent }) => {
  return (
    <div
      key={intent}
      className="border-base-300 bg-base-200 rounded-b-box flex min-h-[6rem] min-w-[18rem] max-w flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4"
    >
      <div
        className={
          "badge " + (intent === "humor" ? "badge-success" : "badge-outline")
        }
      >
        humor
      </div>{" "}
      <div
        className={
          "badge " +
          (intent === "about_us"
            ? "badge-success"
            : "badge-outline badge-primary")
        }
      >
        about Supertype
      </div>{" "}
      <div
        className={
          "badge " +
          (intent === "about_fellowship"
            ? "badge-success"
            : "badge-outline badge-secondary")
        }
      >
        about the fellowship
      </div>{" "}
      <div
        className={
          "badge " +
          (intent === "schedule_meeting"
            ? "badge-success"
            : "badge-outline badge-accent")
        }
      >
        talk to us
      </div>
      <div
        className={
          "badge " +
          (intent === "provide_info"
            ? "badge-success"
            : "badge-outline badge-info")
        }
      >
        subscribe to newsletter
      </div>
      <div
        className={
          "badge " +
          (intent === "unknown" ? "badge-success" : "badge-outline badge-error")
        }
      >
        incomprehensible
      </div>
    </div>
  );
};

export default IntentRow;
