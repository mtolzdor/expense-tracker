import axios from "axios";

const apiUrl = "http://localhost:5294/api/expenses";

export const getExpensesApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}?page=1`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createExpenseApi = async (formData: FormData) => {
  const catagoryId = formData.get("catagoryId");
  const purchaseDate = formData.get("purchaseDate");
  const price = formData.get("price");
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
