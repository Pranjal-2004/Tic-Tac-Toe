import React from "react";
import Header from "./Components/Header";
import GameScreen from "./Components/GameScreen";
import Multiplayer from "./Components/Multiplayer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="/multi" element={<Multiplayer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
