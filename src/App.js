import './App.css';

import { useState, useEffect } from 'react';

import MainRouter from './routers/MainRouter';
import { UserContext } from './contexts/UserContext';


function App() {

  let token = sessionStorage.getItem("userSession");

  const [user, setUser] = useState();
  const [collections, setCollections] = useState([]);
  const [bookmarkedCollections, setBookmarkedCollections] = useState([]);
  const [tagAwards, setTagAwards] = useState({});
  const [experts, setExperts] = useState([]);

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
          // check that the user's proExpiry date is not in the past, if it is, 
          // set proUser to False through an API call
          if (userData.proExpiry < new Date()) {
            userData.proUser = false;
            userData.proExpiry = null;
            // make API CALL to update user's proUser and proExpiry
            fetch(`https://generationsapi.herokuapp.com/api/users/cancel-subscription/`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              }
            })
          }

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
    }

    fetch("https://generationsapi.herokuapp.com/api/experts/")
      .then((res) => res.json())
      .then((data) => setExperts(data.data));

  }, [token, setUser]);

  return (
    <UserContext.Provider
      value={{
        u: [user, setUser],
        // all collections, regardless of bookmarked status
        c: [collections, setCollections],
        e: [experts],
        // all collections that were bookmarked by user
        bc: [bookmarkedCollections, setBookmarkedCollections],
        ta: [tagAwards, setTagAwards],
      }}
    >
      <div className="App-body">
        <MainRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
