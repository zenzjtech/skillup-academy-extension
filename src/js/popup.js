import "../css/popup.css";
import React from "react";
import { render } from "react-dom";
import App from "./popup/App";
import "img/icon-128.png"
require('chrome-extension-async')

render(
  <App/>,
  window.document.getElementById("app-container")
);
