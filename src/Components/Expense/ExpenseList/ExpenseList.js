import React from "react";
import Item from "../ExpenseItem/ExpenseItem";
import Wrapper from "../../../HOC/Wrapper";
import classes from "../../../App.module.css";
import { MdDelete } from "react-icons/md";

const expenseList = ({ expenses, clearExpenses }) => {
  return (
    <Wrapper>
      <ul className={classes.list}>
        {expenses.map((expense, i) => {
          return <Item key={expense.id} expense={expense} />;
        })}
      </ul>
      {expenses.length > 0 && (
        <button className={classes.btn} onClick={() => clearExpenses()}>
          Clear Expenses <MdDelete className={classes.btn_icon} />
        </button>
      )}
    </Wrapper>
  );
};

export default expenseList;
