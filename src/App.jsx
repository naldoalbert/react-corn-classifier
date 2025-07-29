import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';
import Scan from './components/Scan';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='scan' element={<Scan/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App
