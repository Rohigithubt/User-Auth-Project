import { BrowserRouter as Router} from "react-router";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Router>
      <App />
    </Router>
 // </React.StrictMode>
);
