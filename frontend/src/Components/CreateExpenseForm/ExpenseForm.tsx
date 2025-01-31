type Props = {
  onCreateExpense: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ExpenseForm({ onCreateExpense }: Props) {
  return (
    <div className="expense-form-container">
      <form className="expense-form" onSubmit={onCreateExpense}>
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
  );
}
