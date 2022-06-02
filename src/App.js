import './App.css';

// import BookmarkList from './components/BookmarkList/index.jsx';
import CollectionList from './components/CollectionList/index.jsx';
import Mentor from "./components/Mentor";
import Question from './components/Question';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <BookmarkList /> */}
        <CollectionList />
        <Mentor />
        <Question />
      </header>
    </div>
  );
}

export default App;
