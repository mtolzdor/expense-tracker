import { useEffect, useState } from "react";
import "./Expenses.css";
import {
  deleteExpenseApi,
  getExpensesApi,
  updateExpenseApi,
} from "../../api/ExpenseService";
import { Expense } from "../../../../types/Types";
import { NavLink } from "react-router";
import ExpenseList from "../ExpenseList/ExpenseList";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getExpenses();
  }, [page]);

  const getExpenses = () => {
    getExpensesApi(page)
      .then((response) => {
        if (response?.data) {
          setExpenses(response?.data);
        }
      })
      .catch((e) => console.error(e));
  };

  const handleDeleteExpense = (id: number) => {
    deleteExpenseApi(id)
      .then(() => getExpenses())
      .catch((e) => console.error(e));
  };

  const handleUpdateExpense = (id: number, formData: Expense) => {
    updateExpenseApi(
      id,
      formData.catagoryId,
      formData.purchaseDate,
      formData.price
    )
      .then(() => getExpenses())
      .catch((e) => console.error(e));
  };

  return (
    <div className="expense-container">
      <ExpenseList
        expenses={expenses}
        onUpdateExpense={handleUpdateExpense}
        onDeleteExpense={handleDeleteExpense}
      ></ExpenseList>
      <div className="expense-menu">
        <NavLink data-tooltip-content={"Add Expense"} to="/ExpenseForm">
          <button>Add</button>
        </NavLink>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page == 1}>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={expenses.length == 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
