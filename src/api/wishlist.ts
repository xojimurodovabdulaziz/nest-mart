import { api, getErrorMessage } from "./client";

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function getWishlist(token: string) {
  try {
    const response = await api.get("/api/public/wishlist", authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function toggleWishlist(token: string, productId: string) {
  try {
    const response = await api.post(
      "/api/public/wishlist",
      { product_id: productId },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
