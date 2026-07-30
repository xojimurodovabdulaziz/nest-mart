import { api, getErrorMessage } from "./client";

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function getCart(token: string) {
  try {
    const response = await api.get("/api/public/cart", authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function addToCart(token: string, productId: string, quantity = 1) {
  try {
    const response = await api.post(
      "/api/public/cart",
      { product_id: productId, quantity },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function removeFromCart(token: string, productId: string) {
  try {
    const response = await api.delete(`/api/public/cart/${productId}`, authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
