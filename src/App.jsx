import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Quesbar1, Quesbar2, Quesbar3 } from './components/index.js';
import { Ques, Result, Home } from "./pages";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/Q" element={<Ques />} />
        <Route path="/Q1" element={<Quesbar1 />} />
        <Route path="/Q2" element={<Quesbar2 />} />
        <Route path="/Q3" element={<Quesbar3 />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
