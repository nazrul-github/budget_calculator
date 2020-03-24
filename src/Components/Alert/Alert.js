import React from "react";
import classes from "../../App.module.css";

const alert = ({ type, text }) => {
  let alertType = ["alert_", type].join("");

  return (
    <div className={[classes.alert, classes[alertType]].join(" ")}>{text}</div>
  );
};

export default alert;
