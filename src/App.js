import React, { useState } from "react";
import ExpenseForm from "./Components/Expense/ExpenseForm/ExpenseForm";
import ExpenseList from "./Components/Expense/ExpenseList/ExpenseList";
import Alert from "./Components/Alert/Alert";
import Wrapper from "./HOC/Wrapper";
import classes from "./App.module.css";
import { v4 as uuid } from "uuid";

const inititalExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];

const App = () => {
  //******************************** [State Values] **************************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(inititalExpenses);

  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");

  //******************************** [Functionalities] ***********************

  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // setExpenses.push({ id: uuid(), charge: charge, amount: amount });
    if (charge !== "" && amount > 0) {
      const singleExpense = {
        id: uuid(),
        charge,
        amount
      };
      let allExpenses = [...expenses, singleExpense];
      setExpenses(allExpenses);
    } else {
      console.log("please enter value");
    }
    setCharge("");
    setAmount("");
  };

  return (
    <Wrapper>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className={classes.App}>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending:{" "}
        <span className={classes.total}>
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}{" "}
        </span>
      </h1>
    </Wrapper>
  );
};

export default App;
