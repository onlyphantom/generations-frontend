import './App.css';

import { useState, useReducer } from 'react';

import MainRouter from './routers/MainRouter';
import { UserReducer } from './reducers/UserReducer';
import { UserContext } from './contexts/UserContext';


function App() {

  const [user, dispatch] = useReducer(UserReducer, { "token": null });
  const [tray, setTray] = useState([])
  const [collections, setCollections] = useState([])


  return (
    <UserContext.Provider value={{ u: [user, dispatch], t: [tray, setTray], c: [collections, setCollections] }} >
      <div className="App-body">
        <MainRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
