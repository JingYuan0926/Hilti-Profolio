import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/index.js';
import { Ques, Result } from "./pages";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Ques />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
