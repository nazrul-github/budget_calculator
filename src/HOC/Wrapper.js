import React from "react";
import classes from "../App.module.css";
const wrapper = props => {
  return <div className={props.classes}>{props.children}</div>;
};

export default wrapper;
