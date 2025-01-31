import { useEffect, useState } from "react";
import "./ExpensePage.css";
import {
  createExpenseApi,
  getExpensesApi,
} from "../../Services/ExpenseService";
import ExpenseForm from "../../Components/CreateExpenseForm/ExpenseForm";

type Expense = {
  id: number;
  catagoryName: string;
  price: number;
  purchaseDate: Date;
};

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    getExpensesApi(page)
      .then((response) => {
        if (response?.data) {
          setExpenses(response.data);
        }
      })
      .catch((e) => console.error(e));
  };

  const handleCreateExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createExpenseApi(formData)
      .then((response) => {
        if (response?.data) {
          getExpenses();
        }
      })
      .catch((e) => console.error(e));
  };

  const handleNextExpenses = () => {
    getExpensesApi(page + 1)
      .then((response) => {
        if (response?.data) {
          setExpenses(response.data);
          setPage(page + 1);
        }
      })
      .catch((e) => console.log(e));
  };

  const handlePrevExpenses = () => {
    getExpensesApi(page - 1)
      .then((response) => {
        if (response?.data) {
          setExpenses(response.data);
          setPage(page - 1);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="expense-container">
      <button onClick={handlePrevExpenses} disabled={page == 1}>
        Prev
      </button>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Catagory</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: Expense) => (
            <tr key={expense.id}>
              <td>
                {expense.purchaseDate
                  .toString()
                  .split("T")[0]
                  .replace(/-/g, "/")}
              </td>
              <td className="expense-item">{expense.catagoryName}</td>
              <td className="expense-item">${expense.price}</td>
            </tr>
          ))}
          <ExpenseForm onCreateExpense={handleCreateExpense} />
        </tbody>
      </table>
      <button onClick={handleNextExpenses} disabled={expenses.length == 0}>
        Next
      </button>
    </div>
  );
}
