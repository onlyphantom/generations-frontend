import { useState, useEffect, useRef } from "react";
import IntentRow from "./IntentRow";
import RespondFromIntent from "./RespondFromIntent";

const Question = () => {
  const promptRef = useRef(null);
  const [prompt, setPrompt] = useState(null);
  const [currentIntent, setCurrentIntent] = useState(null);

  const handleKeyDown = (event) => {
    // handle enter key for mobile devices and keyboard

    if (event.key === "Enter") {
      event.preventDefault();
      setPrompt(event.target.value);
      promptRef.current.value = "";
    }
  };

  useEffect(() => {
    const q = encodeURIComponent(prompt);
    const uri = process.env.REACT_APP_WIT_URI + q;
    const auth = "Bearer " + process.env.REACT_APP_WIT_CLIENT_TOKEN;
    if (prompt) {
      fetch(uri, { headers: { Authorization: auth } })
        .then((res) => res.json())
        .then((res) => {
          if (res.intents?.length === 0) {
            setCurrentIntent("unknown");
          } else {
            setCurrentIntent(res.intents[0].name);
          }
        });
    }
  }, [prompt]);

  return (
    <section className="mb-32 mx-4 text-center lg:text-left justify-center items-center flex flex-col">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Ask{" "}
        <span className="font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          FellowshipBot
        </span>
      </h2>
      <div className="form-control w-full">
        <label className="label flex flex-col justify-center items-center">
          <span className="label-text prose prose-lg lg:prose-xl">
            Ask a question and we'll point you to more resources. Hit{" "}
            <kbd className="kbd kbd-md">ENTER</kbd> to submit <br />(
            <kbd className="kbd kbd-sm">Return</kbd> on mobile devices).
          </span>
        </label>
        <input
          ref={promptRef}
          type="text"
          placeholder="Tell me about Supertype?"
          className="input input-bordered input-accent border-4"
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
