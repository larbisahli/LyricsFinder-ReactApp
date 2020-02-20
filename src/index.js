import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ListProvider } from "./context";

ReactDOM.render(
  <ListProvider>
    <App />
  </ListProvider>,
  document.getElementById("root")
);
