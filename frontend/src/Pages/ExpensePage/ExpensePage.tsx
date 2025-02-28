import { Fragment, useEffect, useState } from "react";
import "./ExpensePage.css";
import {
  deleteExpenseApi,
  getExpensesApi,
  updateExpenseApi,
} from "../../Services/ExpenseService";
import { Expense } from "../../Types/Types";
import { NavLink } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdAddBox } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import ExpenseForm from "../../Components/ExpenseForm/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  const [page, setPage] = useState(1);
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [updateExpense, setUpdateExpense] = useState<Expense | null>(null);

  useEffect(() => {
    getExpenses();
  }, [page]);

  const getExpenses = () => {
    getExpensesApi(page)
      .then((response) => {
        if (response?.data) {
          const data = response.data.map((expense: Expense) => ({
            ...expense,
            isEditing: false,
          }));
          setExpenses(data);
        }
      })
      .catch((e) => console.error(e));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {};

  const handleToggleUpdate = (ex: Expense) => {
    setEditing(true);
  };

  const handleDeleteExpense = (id: number) => {
    console.log(id);
    deleteExpenseApi(id);
  };

  const handleUpdateExpense = (id: number, formData: Expense) => {
    updateExpenseApi(
      id,
      formData.catagoryId,
      formData.purchaseDate,
      formData.price
    );
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
        <button>Edit</button>
        <button>Delete</button>
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
