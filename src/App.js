import './App.css';

import MainRouter from './routers/MainRouter';

import { UserReducer } from './reducers/UserReducer';
import { UserContext } from './contexts/UserContext';

import { useReducer } from 'react';

function App() {

  const [user, dispatch] = useReducer(UserReducer, { "token" : null });

  return (
    <UserContext.Provider value= {{user, dispatch}}>
      <div className="App-body">
        <MainRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
