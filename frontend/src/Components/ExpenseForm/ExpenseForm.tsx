import { useForm } from "react-hook-form";
import { Expense } from "../../Types/Types";

//update props
type Props = {
  onUpdateExpense: any;
  expense: Expense;
};

export default function ExpenseForm({ expense, onUpdateExpense }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      purchaseDate: new Date(expense.purchaseDate).toISOString().split("T")[0],
      price: expense.price,
      catagoryId: expense.catagoryId,
    },
  });

  return (
    <div className="expense-form-container">
      <div className="expense-items">
        <form
          className="expense-form"
          onSubmit={() => handleSubmit(onUpdateExpense(expense.id))}
        >
          <label htmlFor="purchaseDate">Date:</label>
          <input
            type="date"
            id="purchaseDate"
            {...register("purchaseDate")}
          ></input>
          <label htmlFor="catagoryId">Catagory:</label>
          <select id="catagoryId" {...register("catagoryId")}>
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
            min="0.01"
            step="0.01"
            placeholder="$0.00"
            {...register("price")}
          ></input>
          <button type="submit">Update Expense</button>
        </form>
      </div>
    </div>
  );
}
