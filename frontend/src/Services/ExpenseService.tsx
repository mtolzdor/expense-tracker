import axios from "axios";
import { Expense } from "../Types/Types";

const apiUrl = "http://localhost:5294/api/expenses";

export const getExpensesApi = async (page: number) => {
  try {
    const response = await axios.get(`${apiUrl}?page=${page}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createExpenseApi = async (
  catagoryId: number,
  purchaseDate: Date,
  price: number
) => {
  try {
    const response = await axios.post(apiUrl, {
      catagoryId: catagoryId,
      purchaseDate: purchaseDate,
      price: price,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateExpenseApi = async (
  id: number,
  catagoryId: number,
  purchaseDate: Date,
  price: number
) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, {
      catagoryId: catagoryId,
      purchaseDate: purchaseDate,
      price: price,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExpenseApi = async (id: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
