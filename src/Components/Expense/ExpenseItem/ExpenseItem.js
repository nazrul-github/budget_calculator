import React from "react";
import classes from "../../../App.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import ItemContext from "../../../Context/Item-Context";

const ExpenseItem = props => {
  const context = React.useContext(ItemContext);
  console.log(context);
  const { id, charge, amount } = props.expense;
  return (
    <li className={classes.item}>
      <div className={classes.info}>
        <span className={classes.expense}>{charge}</span>
        <span className={classes.amount}>${amount}</span>
      </div>
      <div>
        <button
          className={classes.edit_btn}
          aria-label="edit button"
          onClick={() => context.editItemHandler(id)}
        >
          <MdEdit />
        </button>
        <button
          className={classes.clear_btn}
          aria-label="clear button"
          onClick={() => context.deleteItemHandler(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
