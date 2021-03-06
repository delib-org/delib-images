import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";



import './App.scss';

//components
import Main from './Main';
import Home from './views/pages/home/Home';
import CreateChallange from "./views/pages/CreateChallange/CreateChallange";
import CreateCompare from "./views/pages/CreateCompare/CreateCompare";
import Compare from './views/pages/Compare/Compare';
import ComparePublic from './views/pages/ComparePublic/ComparePublic';
import Login from './views/pages/Login/Login';

const analytics = getAnalytics();

function App() {
  
  const [user, setUser] = useState({});
  const [lastPage, setLastPage] = useState('/')

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        

        console.log(userLogged)
        setUser(userLogged);
      
        // ...
      } else {
        // User is signed out
        // ...
        setUser({})
      }
    });
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main user={user} />}>
          
          <Route path='login' element={<Login lastPage={lastPage} user={user}/>} />
          <Route path="create-challange" element={<CreateChallange user={user} />} />
          <Route path="create-compare" element={<CreateCompare user={user} setLastPage={setLastPage} />} />
          <Route path="compare/:userId/:compareId" element={<Compare user={user} setLastPage={setLastPage} />} />
          <Route path='compare-public/:userId/:compareId' element={<ComparePublic user={user} />} />
          <Route path="" element={<Home user={user} setLastPage={setLastPage} />} />
          <Route path="*" element={<Home user={user} setLastPage={setLastPage} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
