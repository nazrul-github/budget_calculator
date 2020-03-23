import React from "react";
import classes from "../../../App.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

const expenseItem = props => {
  const { id, charge, amount } = props.expense;
  return (
    <li className={classes.item}>
      <div className={classes.info}>
        <span className={classes.expense}>{charge}</span>
        <span className={classes.amount}>${amount}</span>
      </div>
      <div>
        <button className={classes.edit_btn} aria-label="edit button">
          <MdEdit />
        </button>
        <button className={classes.clear_btn} aria-label="clear button">
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default expenseItem;
