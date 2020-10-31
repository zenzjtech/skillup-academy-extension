import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import FetchResource from './FetchResource';
import Rating from './Rating';
import Copyright from "./CopyRight";

const View = (props) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          Facebook ID Finder
        </Toolbar>
      </AppBar>
      <FetchResource userInfo={props.userInfo}/>
      <Copyright/>
      <Rating/>
    </>
  )
};

export default View;
