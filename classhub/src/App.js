import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import CreatePage from "./components/CreatePage";
import ClassPage from "./components/ClassPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
         <Route path="/create" exact element={<CreatePage/>} />
         <Route path="/class/:id" element={<ClassPage/>} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;
