import './App.css';

import Header from "./components/Header"
import CollectionList from './components/CollectionList/index.jsx';
import Mentor from "./components/Mentor";
import Question from './components/Question';
import TrayButton from './components/Tray/TrayButton';

function App() {
  return (
    <div className="App-body text-center">
      <Header />
      <CollectionList />
      <Mentor />
      <Question />
      <TrayButton />
    </div>
  );
}

export default App;
