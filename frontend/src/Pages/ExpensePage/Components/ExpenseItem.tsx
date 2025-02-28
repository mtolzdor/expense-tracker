import { useForm } from "react-hook-form";
import { Expense } from "../../../Types/Types";
import "./ExpenseList.css";

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

  const onSubmit = (formData: any) => {
    onUpdateExpense(expense.id, formData);
  };

  const handleDeleteExpense = () => {
    onDeleteExpense(expense.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="expense-flex-item">
        <input
          type="date"
          id="purchaseDate"
          {...register("purchaseDate")}
        ></input>
        <select
          className="expense-item-catagory"
          id="catagoryId"
          {...register("catagoryId")}
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
          type="number"
          id="price"
          min="0.01"
          step="0.01"
          {...register("price")}
        ></input>
      </div>
      <button className="btn-cancel" onClick={() => reset(defaultValues)}>
        Cancel
      </button>
      <button className="btn-save" type="submit">
        Save
      </button>
      <button
        className="btn-delete"
        onClick={() => onDeleteExpense(expense.id)}
      >
        Delete
      </button>
    </form>
  );
}
