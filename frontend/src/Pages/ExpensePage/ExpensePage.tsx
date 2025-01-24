import { useEffect, useState } from "react";
import "./ExpensePage.css";
import {
  createExpenseApi,
  getExpensesApi,
} from "../../Services/ExpenseService";

type Expense = {
  id: number;
  catagoryName: string;
  price: number;
  purchaseDate: Date;
};

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    getExpensesApi()
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
    createExpenseApi(formData).then((response) => {
      if (response?.data) {
        getExpenses();
      }
    });
  };

  return (
    <div className="expense-container">
      <div className="expense-list">
        {expenses.map((expense: Expense) => (
          <div className="expense-items" key={expense.id}>
            <h3>{expense.catagoryName}</h3>
            <div>${expense.price}</div>
          </div>
        ))}
        <div className="new-expense">
          <form className="expense-form" onSubmit={handleCreateExpense}>
            <label htmlFor="catagoryId">Catagory:</label>
            <select id="catagoryId" name="catagoryId" defaultValue={1}>
              <option value="1">Groceries</option>
              <option value="2">Leisure</option>
              <option value="3">Electronics</option>
              <option value="4">Utilities</option>
              <option value="5">Clothing</option>
              <option value="6">Health</option>
              <option value="7">Others</option>
            </select>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0.01"
              step="0.01"
              placeholder="$0.00"
            ></input>
            <label htmlFor="purchaseDate">Date:</label>
            <input type="date" id="purchaseDate" name="purchaseDate"></input>
            <button type="submit">Add Expense</button>
          </form>
        </div>
      </div>
    </div>
  );
}
