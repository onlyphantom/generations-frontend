import { Helmet } from "react-helmet";

import Header from "../components/Header";
import CollectionList from "../components/CollectionList/index.jsx";
import Mentor from "../components/Mentor";
import Question from "../components/Question";
import Tray from "../components/Tray";
import Steps from "../components/Steps";
import FellowshipPlus from "../components/FellowshipPlus";

function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Supertype Fellowship | Peer to peer, self-directed learning paths in
          data science and software engineering
        </title>
        <meta
          name="description"
          content="Peer-to-peer learning community for data science practitioners and software engineers."
        />
        <link rel="canonical" href="https://fellowship.supertype.ai" />
        <script
          type="text/javascript"
          src="https://generationsapi.herokuapp.com/plugins/strapi-stripe/static/stripe.js"
        ></script>
      </Helmet>
      <Header />
      <CollectionList />
      <Steps />
      <Mentor />
      <Question />
      <Tray />
      <FellowshipPlus />
    </>
  );
}

export default Home;
