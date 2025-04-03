import React from "react";
import { HomePage, DetailPage } from "./pages";
import { Route, Routes } from "react-router";
import { Counter } from "./pages/Counter";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
