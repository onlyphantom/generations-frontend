import './App.css';

import { useState, useEffect } from 'react';

import MainRouter from './routers/MainRouter';
import { UserContext } from './contexts/UserContext';


function App() {

  let token = sessionStorage.getItem("userSession");

  const [user, setUser] = useState();
  const [tray, setTray] = useState([]);
  const [collections, setCollections] = useState([]);
  const [bookmarkedCollections, setBookmarkedCollections] = useState([]);
  const [tagAwards, setTagAwards] = useState({});

  useEffect(() => {
    if (token) {
    fetch(`https://generationsapi.herokuapp.com/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((userData) => {
      setUser({ 
        "token": token, 
        "expendedEffort": userData?.expendedEffort, 
        "proUser": userData?.proUser, 
        "proExpiry": userData?.proExpiry 
      });
    })
  } else {
    setUser({ 
      "token": null, 
      "expendedEffort": null, 
      "proUser": null, 
      "proExpiry": null
    });
  }}, [token, setUser]);

  return (
    <UserContext.Provider value={{ u: [user, setUser], t: [tray, setTray], c: [collections, setCollections], bc: [bookmarkedCollections, setBookmarkedCollections], ta: [tagAwards, setTagAwards] }} >
      <div className="App-body">
        <MainRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
