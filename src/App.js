import logo from './logo.svg';
import './App.css';

import Header from "./components/Header"
import BookmarkList from './components/BookmarkList/index.jsx';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <BookmarkList />
        </header>
      </div>
    </>
  );
}

export default App;
