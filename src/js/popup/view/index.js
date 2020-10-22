import React from "react";

import FetchResource from './FetchResource';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const View = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          Facebook ID Finder
        </Toolbar>
      </AppBar>
      <FetchResource/>
    </>
  )
};

export default View;
