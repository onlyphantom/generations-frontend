import React from "react";

const IntentRow = ({ intent }) => {
  return (
    <div
      key={intent}
      class="border-base-300 bg-base-200 rounded-b-box rounded-tr-box flex min-h-[6rem] min-w-[18rem] max-w flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4"
    >
      <div
        class={
          "badge " + (intent === "general" ? "badge-success" : "badge-outline")
        }
      >
        general
      </div>{" "}
      <div
        class={
          "badge " +
          (intent === "about_us"
            ? "badge-success"
            : "badge-outline badge-primary")
        }
      >
        about Supertype
      </div>{" "}
      <div
        class={
          "badge " +
          (intent === "about_fellowship"
            ? "badge-success"
            : "badge-outline badge-secondary")
        }
      >
        about the fellowship
      </div>{" "}
      <div
        class={
          "badge " +
          (intent === "schedule_meeting"
            ? "badge-success"
            : "badge-outline badge-accent")
        }
      >
        talk to us
      </div>
      <div
        class={
          "badge " +
          (intent === "connect_us"
            ? "badge-success"
            : "badge-outline badge-info")
        }
      >
        keep in touch
      </div>
      <div
        class={
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
