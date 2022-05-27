import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="">
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
