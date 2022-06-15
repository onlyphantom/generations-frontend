import './App.css';

import Header from './components/Header';
import CollectionList from './components/CollectionList/index.jsx';
import Mentor from "./components/Mentor";
import Question from './components/Question';
import Tray from './components/Tray';
import Steps from './components/Steps';

import { UserReducer } from './reducers/UserReducer';
import { UserContext } from './contexts/UserContext';

import { useReducer } from 'react';

function App() {

  const [user, dispatch] = useReducer(UserReducer, { "token" : null });

  return (
    <UserContext.Provider value= {{user, dispatch}}>
      <div className="App-body">
        <Header />
        <CollectionList />
        <Steps />
        <Mentor />
        <Question />
        <Tray />
      </div>
    </UserContext.Provider>
  );
}

export default App;
