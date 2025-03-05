import { useForm } from "react-hook-form";
import { Expense } from "../../../../types/Types";
import "./ExpenseItem.css";
import { useState } from "react";

type props = {
  expense: Expense;
  onUpdateExpense: any;
  onDeleteExpense: any;
};

export default function ExpenseItem({
  expense,
  onUpdateExpense,
  onDeleteExpense,
}: props) {
  const defaultValues = {
    purchaseDate: new Date(expense.purchaseDate).toISOString().split("T")[0],
    price: expense.price,
    catagoryId: expense.catagoryId,
  };
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const [editing, setEditing] = useState(true);

  const handleFormSubmit = (formData: any) => {
    onUpdateExpense(expense.id, formData);
  };

  const handleDeleteExpense = () => {
    onDeleteExpense(expense.id);
  };

  const handleCancelUpdate = () => {
    setEditing(true);
    reset(defaultValues);
  };

  return (
    <div className="expense-item-container">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onClick={() => setEditing(false)}
        id="expense-form"
      >
        <div className="expense-item-form">
          <input
            type="date"
            id="purchaseDate"
            {...register("purchaseDate")}
            disabled={editing}
          ></input>
          {/*fix defualt value for select box*/}
          <select
            id="catagoryId"
            {...register("catagoryId")}
            disabled={editing}
          >
            <option value="1">Groceries</option>
            <option value="2">Leisure</option>
            <option value="3">Electronics</option>
            <option value="4">Utilities</option>
            <option value="5">Clothing</option>
            <option value="6">Health</option>
            <option value="7">Others</option>
          </select>
          <input
            className="expense-item-price"
            type="number"
            id="price"
            min="0.01"
            step="0.01"
            {...register("price")}
            disabled={editing}
          ></input>
        </div>
      </form>
      <div>
        <button className="btn-save" form="expense-form" type="submit">
          Save
        </button>
        <button className="btn-cancel" onClick={handleCancelUpdate}>
          Cancel
        </button>
        <button className="btn-delete" onClick={handleDeleteExpense}>
          Delete
        </button>
      </div>
    </div>
  );
}
