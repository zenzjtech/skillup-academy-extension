import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import FetchResource from './FetchResource';
import Rating from './Rating';
import Copyright from "./CopyRight";
import Switcher from "./Switcher";

const View = (props) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          Test textRazorAPI
        </Toolbar>
      </AppBar>
      <Switcher />
    </>
  )
};

export default View;
