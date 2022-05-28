const RespondFromIntent = ({ intent, entities }) => {
  console.log(intent);
  // console.log(entities);
  if (intent === "greeting") {
    return "Hi, I am your personal assistant. How can I help you?";
  }
  if (intent === "goodbye") {
    return "Bye, have a nice day!";
  }
  if (intent === "thanks") {
    return "You are welcome!";
  }
  if (intent === "confused") {
    return "I am sorry, I am not sure what you mean.";
  }
  if (intent === "weather") {
    return "The weather is fine.";
  }
  if (intent === "time") {
    return "The time is " + new Date().toLocaleTimeString();
  }
  if (intent === "joke") {
    return "Why did the chicken cross the road?";
  }
  if (intent === "news") {
    return "The news is good.";
  }
  if (intent === "about_us") {
    return (
      <p className="prose">
        You can read all about Supertype at our{" "}
        <a
          href="https://supertype.ai/about-us"
          target="_blank"
          rel="noreferrer"
          className="underline text-orange-100 hover:text-orange-300"
        >
          About us
        </a>{" "}
        page
      </p>
    );
  } else {
    return "I am sorry, I am not sure what you mean.";
  }
};

export default RespondFromIntent;
