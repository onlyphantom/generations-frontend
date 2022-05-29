import { useState, useEffect } from "react";

const RespondFromIntent = ({ intent, entities }) => {
  // console.log(intent);
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    if (intent === "humor") {
      fetch("https://sv443.net/jokeapi/v2/joke/Programming?type=single")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.joke);
          setJoke(data.joke);
        })
        .catch((err) =>
          setJoke("I don't get paid enough to be telling jokes.")
        );
    }
  }, [intent]);

  if (intent === "greeting") {
    return "Hi, I am your personal assistant. How can I help you?";
  }
  if (intent === "time") {
    return "The time is " + new Date().toLocaleTimeString();
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
  if (intent === "humor") {
    return <p className="prose">{joke}</p>;
  }
  if (intent === "about_us") {
    return (
      <p className="prose">
        🤖: Supertype is a full-cycle data science consultancy.
        <br /> You can read all about our story at the{" "}
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
  }
  if (intent === "about_fellowship") {
    return (
      <p className="prose">
        🤖: Supertype Fellowship is a paid, peer-to-peer community for data
        science practitioners and software engineers who want to develop product
        development skills by immersing themselves with other industry-minded
        developers. <br /> We're currently invite-only, and admissions are
        subjected to a quick screening 📋 process. You can put in an application
        using the form found at the top of this app.
      </p>
    );
  }
  if (intent === "schedule_meeting") {
    return (
      <p className="prose">
        🤖: The best way to get in touch with the fellowship organizers is
        through an email (s@supertype.ai). Outside of email, the next best
        channel is to send my creator{" "}
        <a
          href="https://twitter.com/_onlyphantom"
          target="_blank"
          rel="noreferrer"
          className="underline text-orange-100 hover:text-orange-300"
        >
          a DM: @_onlyphantom (Samuel Chan)
        </a>{" "}
        or a
        <a
          href="https://www.linkedin.com/in/chansamuel/"
          target="_blank"
          rel="noreferrer"
          className="underline text-orange-100 hover:text-orange-300"
        >
          LinkedIn message
        </a>
      </p>
    );
  }
  if (intent === "provide_info") {
    // return name and email to confirm they are correct
  } else {
    return (
      <p class="prose">
        🤖: I am sorry, I am not sure what you mean. You can ask me a question
        relating to the organizers, the Supertype Fellowship program, or
        anything I have specific knowledge of. I am not human, after all 😔.
        <br />
        <br />
        Beyond the scope of these topics, you'd be better served by sending{" "}
        <a
          href="https://twitter.com/_onlyphantom"
          target="_blank"
          rel="noreferrer"
          className="underline text-orange-100 hover:text-orange-300"
        >
          my creator a DM: @_onlyphantom (Samuel Chan)
        </a>
      </p>
    );
  }
};

export default RespondFromIntent;
