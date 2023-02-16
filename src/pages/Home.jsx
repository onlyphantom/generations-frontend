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
