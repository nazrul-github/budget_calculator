import React, { useState, useEffect } from "react";
import ExpenseForm from "./Components/Expense/ExpenseForm/ExpenseForm";
import ExpenseList from "./Components/Expense/ExpenseList/ExpenseList";
import Alert from "./Components/Alert/Alert";
import Wrapper from "./HOC/Wrapper";
import classes from "./App.module.css";
import { v4 as uuid } from "uuid";
import ItemContext from "./Context/Item-Context";

// const inititalExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 1200 }
// ];

//Using local storage to store user inputted value, so it won't lost when page reloads

const inititalExpenses = localStorage.getItem("expense")
  ? JSON.parse(localStorage.getItem("expense"))
  : [];

const App = () => {
  //******************************** [State Values] **************************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(inititalExpenses);

  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
  //Expense Id
  const [itemId, setItemId] = useState("");
  //is edited
  const [editBtn, setEditBtn] = useState(false);

  //alert
  const [alert, setalert] = useState({ show: false });

  //******************[Use Effect]*******************
  //Using Useffect to set the value inside localstorage with key
  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }, [expenses]);

  //******************************** [Functionalities] ***********************

  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const editItemHandler = itemId => {
    let index = expenses.findIndex(x => x.id === itemId);
    const { id, charge, amount } = expenses[index];
    setCharge(charge);
    setAmount(amount);
    setEditBtn(true);
    setItemId(id);
  };

  const deleteItemHandler = itemId => {
    // let allExpenses = [...expenses];
    // let index = allExpenses.findIndex(x => x.id === itemId);
    // allExpenses.splice(index, 1);

    let allExpenses = expenses.filter(item => {
      return item.id !== itemId;
    });
    setExpenses(allExpenses);

    let alert = { type: "", text: "" };
    alert.text = "Item deleted";
    alert.type = "danger";
    alertHandler(alert);
  };

  const clearAllExpenseHandler = () => {
    setExpenses([]);

    let alert = { type: "", text: "" };
    alert.text = "All Items deleted";
    alert.type = "danger";
    alertHandler(alert);
  };

  //Handle alert
  const alertHandler = ({ type, text }) => {
    setalert({ show: true, type, text });
    setTimeout(() => {
      setalert({ show: false });
    }, 30000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let alert = { type: "", text: "" };
    // setExpenses.push({ id: uuid(), charge: charge, amount: amount });
    if (charge !== "" && amount > 0) {
      let singleExpense;
      let allExpenses;
      if (!editBtn) {
        singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        allExpenses = [...expenses, singleExpense];
        alert.text = "Item saved successfully";
        alert.type = "success";
        alertHandler(alert);
      } else {
        singleExpense = {
          id: itemId,
          charge,
          amount
        };
        let index = expenses.findIndex(x => x.id === itemId);
        allExpenses = [...expenses];
        allExpenses[index] = singleExpense;
        setEditBtn(false);
        alert.text = "Item edited successfully";
        alert.type = "success";
        alertHandler(alert);
      }
      setExpenses(allExpenses);
    } else {
      alert.text = "Please enter amount and charge type";
      alert.type = "danger";
      alertHandler(alert);
    }
    setCharge("");
    setAmount("");
  };

  return (
    <Wrapper>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget Calculator</h1>
      <main className={classes.App}>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          editBtn={editBtn}
        />
        <ItemContext.Provider
          value={{
            editItemHandler: editItemHandler,
            deleteItemHandler: deleteItemHandler
          }}
        >
          <ExpenseList
            expenses={expenses}
            clearExpenses={clearAllExpenseHandler}
          />
        </ItemContext.Provider>
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
