import { useState, useEffect } from "react";
import { scrollToSection } from "../Navbar";

const RespondFromIntent = ({ intent, entities }) => {
  console.log(intent, entities);
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    if (intent === "humor") {
      fetch("https://sv443.net/jokeapi/v2/joke/Programming?type=single")
        .then((res) => res.json())
        .then((data) => {
          setJoke(data.joke);
        })
        .catch((err) =>
          setJoke("I don't get paid enough to be telling jokes.")
        );
    }
  }, [intent]);
  if (intent === "about_fellowship") {
    return (
      <p className="prose">
        🤖: Supertype Fellowship is a peer-to-peer community for data science
        practitioners and software engineers who want to acquire product
        development skills by &nbsp;
        <span
          className="link-primary cursor-pointer"
          onClick={() => scrollToSection("curations")}
        >
          shipping real-world projects
        </span>
        &nbsp; used by real people.
        <br /> We're currently in pre-launch and admissions might be subjected
        to a quick screening 📋 process. If you need mentorship support on any
        Electives, or wish to be part of an exclusively invite-only peer to peer
        learning forum, you may consider signing up for a Fellowship Plus
        subscription.
        <br />
        <br />
        To get started, I recommend:
        <ul className="list-disc list-inside">
          <li>
            Start with the{" "}
            <span
              className="link-primary cursor-pointer"
              onClick={() => scrollToSection("curations")}
            >
              <code>Onboarding 🛫</code>{" "}
            </span>
            Elective
          </li>
          <li>
            Make sure to Say 👋 on{" "}
            <a
              href="https://github.com/supertypeai"
              target="_blank"
              rel="noreferrer noopener"
              className="link-primary cursor-pointer"
            >
              the Discussions thread on GitHub
            </a>
          </li>
          <li>
            Pick one other Elective and start working on it. Read the
            instructions in the README.md or the repository Wiki and open issues
            to discuss your pull requests when you're unsure about something.
          </li>
        </ul>
      </p>
    );
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
          className="link-primary cursor-pointer"
        >
          About us | Supertype
        </a>{" "}
        page
      </p>
    );
  }
  if (intent === "electives") {
    return "🤖: The electives are self-paced and can be completed at your own pace. You can filter the Electives by tags to find the ones that interest you the most.";
  }

  if (intent === "humor") {
    return <p className="prose">🤖: {joke}</p>;
  }

  if (intent === "newsletter") {
    return (
      <p>
        🤖: You can sign up for our newsletter at the
        <span
          className="link-primary cursor-pointer"
          onClick={() => scrollToSection("header")}
        >
          top of the page. We will never spam you, and we will send a maximum of
          1 email per month.
        </span>
      </p>
    );
  }
  if (intent === "pricing") {
    return (
      <p className="prose">
        🤖: Fellowship+ is an add-on to the core Fellowship program. The main
        features of the Fellowship program will always be free to the greatest
        extent possible. We also have a Fellowship Plus tier, which include
        mentorship support and access to a peer-to-peer learning forum.
        <br />
        <br />
        You can made a one-time payment of $156 for a one-year subscription to
        Fellowship Plus (works out to $13 per month). The payment is handled by
        Stripe and your check out information as well as credit card is never
        stored on our servers.
      </p>
    );
  }

  if (intent === "talk_to_us") {
    return (
      <p className="prose">
        🤖: The best way to get in touch with the fellowship organizers is
        through an email (<code>s@supertype.ai</code>). Outside of email, the
        next best channel is to send my creator{" "}
        <a
          href="https://twitter.com/_onlyphantom"
          target="_blank"
          rel="noreferrer noopener"
          className="link-primary cursor-pointer"
        >
          a DM: @_onlyphantom (Samuel Chan)
        </a>{" "}
        or a
        <a
          href="https://www.linkedin.com/in/chansamuel/"
          target="_blank"
          rel="noreferrer"
          className="link-primary cursor-pointer"
        >
          LinkedIn message
        </a>
      </p>
    );
  }

  if (intent === "unknown") {
    return (
      <p className="prose">
        🤖: I am sorry, I am not sure what you mean. You can ask me a question
        relating to the organizers, the Supertype Fellowship program, or
        anything I have specific knowledge of. I am not ChatGPT, after all 😔.
        <br />
        <br />
        Beyond the scope of these topics, you'd be better served by sending{" "}
        <a
          href="https://twitter.com/_onlyphantom"
          target="_blank"
          rel="noreferrer"
          className="link-primary cursor-pointer"
        >
          my creator a DM: @_onlyphantom (Samuel Chan)
        </a>
      </p>
    );
  }
};

export default RespondFromIntent;
