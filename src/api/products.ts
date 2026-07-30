import { api, getErrorMessage } from "./client";

interface ProductParams {
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export async function getProducts(params: ProductParams = {}) {
  try {
    const response = await api.get("/api/public/products", { params });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function searchProducts(query: string) {
  try {
    const response = await api.get("/api/public/products/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
