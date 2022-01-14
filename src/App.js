import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.scss';

//components
import Main from './Main';
import Home from './views/pages/home/Home';
import CreateChallange from "./views/pages/CreateChallange/CreateChallange";
import CreateCompare from "./views/pages/CreateCompare/CreateCompare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
        <Route path="main" element={<Home />} />
          <Route path="create-challange" element={<CreateChallange />} />
          <Route path="create-compare" element={<CreateCompare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
