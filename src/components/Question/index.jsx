import React, { useState, useEffect, useRef } from "react";
import IntentRow from "./IntentRow";
import RespondFromIntent from "./RespondFromIntent";

const Question = () => {
  const promptRef = useRef(null);
  const [prompt, setPrompt] = useState(null);
  const [currentIntent, setCurrentIntent] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setPrompt(event.target.value);
      promptRef.current.value = "";
    }
  };

  useEffect(() => {
    const q = encodeURIComponent(prompt);
    const uri = "https://api.wit.ai/message?v=20220503&q=" + q;
    const auth = "Bearer " + process.env.REACT_APP_WIT_CLIENT_TOKEN;

    if (prompt) {
      fetch(uri, { headers: { Authorization: auth } })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.intents?.length === 0) {
            setCurrentIntent("unknown");
          } else {
            setCurrentIntent(res.intents[0].name);
          }
        });
    }
  }, [prompt]);

  return (
    <section className="mb-32 mx-4 text-center lg:text-left">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Ask <u className="text-orange-200">FellowshipBot</u>
      </h2>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text prose">
            Ask a question and we'll point you to more resources. Hit{" "}
            <code>ENTER</code> to submit.
          </span>
        </label>
        <input
          ref={promptRef}
          type="text"
          placeholder="Tell me about Supertype?"
          class="input input-bordered input-secondary w-full"
          onKeyDown={handleKeyDown}
        />
      </div>
      <IntentRow intent={currentIntent} />
      {currentIntent && (
        <div className="mt-12 prose">
          <RespondFromIntent intent={currentIntent} />
        </div>
      )}
    </section>
  );
};

export default Question;
