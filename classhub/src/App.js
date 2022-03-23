import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import CreatePage from "./components/createpage.component";
import ClassPage from "./components/classpage.component";

function App() {
  return (
    <Router>
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a>
       </header>*/}
       <Routes>
         <Route path="/create" exact element={<CreatePage/>} />
         <Route path="/view/:id" element={<ClassPage/>} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;
