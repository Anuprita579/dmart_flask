import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
