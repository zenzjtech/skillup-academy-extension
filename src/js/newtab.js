import React from "react";
import { render } from "react-dom";

import NewTab from "./newtab/App.jsx";

render(
  <NewTab/>,
  window.document.getElementById("app-container")
);
