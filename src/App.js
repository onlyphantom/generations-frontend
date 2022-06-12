import './App.css';

import Header from "./components/Header"
import CollectionList from './components/CollectionList/index.jsx';
import Mentor from "./components/Mentor";
import Question from './components/Question';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <CollectionList />
          <Mentor />
          <div style={{
            position: "fixed", right: 20, bottom: 20, width: 220, height: 100,
          }}>
            <div style={{
              position: "absolute",
              // backgroundColor: "green"
            }}>
              <label for="tray" className="btn glass drawer-button shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Learning Tray</label>
            </div>
          </div>
          <Question />
        </header>
      </div>
    </>
  );
}

export default App;
