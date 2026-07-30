import { api, getErrorMessage } from "./client";

export async function getProductById(id: string) {
  try {
    const response = await api.get(`/api/public/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
