import React from "react";
import { HomePage, DetailPage } from "./pages";
import { Route, Routes } from "react-router";
import rootStore, { StoreContext } from "./mobx";

const App: React.FC = () => {
  return (
    <StoreContext.Provider value={rootStore}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </StoreContext.Provider>
  );
};

export default App;
