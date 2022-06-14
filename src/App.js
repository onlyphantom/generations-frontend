import './App.css';

import Header from "./components/Header"
import CollectionList from './components/CollectionList/index.jsx';
import Mentor from "./components/Mentor";
import Question from './components/Question';
import Tray from './components/Tray';

function App() {
  return (
    <div className="App-body">
      <Header />
      <CollectionList />
      <Mentor />
      <Question />
      <Tray />
    </div>
  );
}

export default App;
