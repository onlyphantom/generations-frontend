import './App.css';

import Header from "./components/Header"
// import BookmarkList from './components/BookmarkList/index.jsx';
import CollectionList from './components/CollectionList/index.jsx';
import Mentor from "./components/Mentor";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          {/* <BookmarkList /> */}
          <CollectionList />
          <Mentor />
        </header>
      </div>
    </>
  );
}

export default App;
