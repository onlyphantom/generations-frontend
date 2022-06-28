import './App.css';

import { useReducer } from 'react';

import MainRouter from './routers/MainRouter';
import { UserReducer } from './reducers/UserReducer';
import { UserContext } from './contexts/UserContext';


function App() {

  const [user, dispatch] = useReducer(UserReducer, { "token": null });

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <div className="App-body">
        <MainRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
