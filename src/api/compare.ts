import { api, getErrorMessage } from "./client";

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function getCompare(token: string) {
  try {
    const response = await api.get("/api/public/compare", authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function addToCompare(token: string, productId: string) {
  try {
    const response = await api.post(
      "/api/public/compare",
      { product_id: productId },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function removeFromCompare(token: string, productId: string) {
  try {
    const response = await api.delete("/api/public/compare", {
      ...authHeaders(token),
      params: { product_id: productId },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
