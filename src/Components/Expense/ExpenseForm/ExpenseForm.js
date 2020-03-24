import React from "react";
import classes from "../../../App.module.css";
import { MdSend } from "react-icons/md";

const expenseForm = ({
  charge,
  amount,
  handleAmount,
  handleCharge,
  handleSubmit,
  editBtn
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.form_center}>
        <div className={classes.form_group}>
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className={classes.form_control}
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className={classes.form_group}>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className={classes.form_control}
            id="amount"
            name="amount"
            placeholder="e.g. 1000"
            onChange={handleAmount}
            value={amount}
          />
        </div>
      </div>
      <button type="submit" className={classes.btn}>
        {editBtn ? "Edit" : "Submit"} <MdSend className={classes.btn_icon} />
      </button>
    </form>
  );
};

export default expenseForm;
