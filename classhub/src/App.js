import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Axios from "axios";
import React, { useEffect, useState } from 'react'; // Hooks for functional components

import logo from './logo.svg';
import './App.css';

import CreatePage from "./components/CreatePage";
import ClassPage from "./components/ClassPage";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";

function App() {

  const [listOfClasses, setListOfClasses] = useState([])

  useEffect(() =>{
      Axios.get("http://localhost:5000/getClasses")
          .then((response) => {
          setListOfClasses(response.data)
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
         <Route path="/create" exact element={<CreatePage/>} />
         <Route path="/class/:id" element={<ClassPage/>} />
         <Route path="/search" element={<SearchBar placeholder = "Enter class name...." data = {listOfClasses} />} />
         <Route path="/dashboard" exact element={<h1>really cool dashboard placeholder</h1>} />
         <Route path="/signin" exact element={<h1>signin placeholder :)</h1>} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;
