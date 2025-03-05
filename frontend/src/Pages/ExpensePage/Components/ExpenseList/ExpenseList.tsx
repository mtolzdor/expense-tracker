import { Fragment } from "react/jsx-runtime";
import { Expense } from "../../../../Types/Types";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import "./ExpenseList.css";

type props = {
  expenses: Array<Expense>;
  onUpdateExpense: any;
  onDeleteExpense: any;
};

export default function ExpenseList({
  expenses,
  onUpdateExpense,
  onDeleteExpense,
}: props) {
  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <span>Date</span>
        <span>Catagory</span>
        <span>Price</span>
      </div>
      {expenses.map((expense) => (
        <Fragment key={expense.id}>
          <ExpenseItem
            expense={expense}
            onUpdateExpense={onUpdateExpense}
            onDeleteExpense={onDeleteExpense}
          ></ExpenseItem>
        </Fragment>
      ))}
    </div>
  );
}
