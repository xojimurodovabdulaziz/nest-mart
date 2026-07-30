import { api, getErrorMessage } from "./client";

export async function getCategories() {
  try {
    const response = await api.get("/api/public/categories");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
