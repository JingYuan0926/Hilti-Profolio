import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Fail, Success } from './components/index.js';
import { Ques, Result, Home } from "./pages";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Tailored AI Questionnaire" element={<Ques />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Application roadmap" element={<Fail />} />
        <Route path="/Application-Roadmap" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
