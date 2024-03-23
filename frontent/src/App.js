import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router

import Home from './Pages/Home';
import Create from "./Pages/Create";
import Read from "./Pages/Read";
import Update from "./Pages/Update";

function App() {
  return (
    <Router> {/* Wrap Routes in Router */}
      <Routes>
        <Route exact path="/" element={<Home />} /> {/* Use element prop instead of Component */}
        <Route exact path="/Create" element={<Create/>}/>
        <Route exact path="/Read" element={<Read/>}/>
        <Route exact path="/Update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
