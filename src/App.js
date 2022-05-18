import logo from './logo.svg';
import './App.css';

import Header from "./components/Header"
import BookmarkList from './components/BookmarkList/index.jsx';
import Mentor from "./components/Mentor";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <BookmarkList />
          <Mentor />
        </header>
      </div>
    </>
  );
}

export default App;
