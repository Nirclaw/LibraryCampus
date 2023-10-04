import React from "react";
import ReactDOM from "react-dom/client";
import "./stylres.css";
import { HeroesApp } from "./HeroesApp";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroesApp />
    </BrowserRouter>
  </React.StrictMode>
);
