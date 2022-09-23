import './App.css';

import { useState, useReducer } from 'react';

import MainRouter from './routers/MainRouter';
import { UserReducer } from './reducers/UserReducer';
import { UserContext } from './contexts/UserContext';


function App() {

  let token = sessionStorage.getItem("userSession");

  const [user, dispatch] = useReducer(UserReducer, token ? { "token": token } : { "token": null });
  const [tray, setTray] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tagAwards, setTagAwards] = useState({});
  const [expendedEffort, setExpendedEffort] = useState();

  return (
    <UserContext.Provider value={{ u: [user, dispatch], t: [tray, setTray], c: [collections, setCollections], ta: [tagAwards, setTagAwards], ee: [expendedEffort, setExpendedEffort] }} >
      <div className="App-body">
        <MainRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
