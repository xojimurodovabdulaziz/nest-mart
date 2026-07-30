import { api, getErrorMessage } from "./client";

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function getReviews(productId: string, page = 1, limit = 20) {
  try {
    const response = await api.get(`/api/public/products/${productId}/reviews`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createReview(
  token: string,
  productId: string,
  rating: number,
  comment: string
) {
  try {
    const response = await api.post(
      `/api/public/products/${productId}/reviews`,
      { rating, comment },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateReview(
  token: string,
  reviewId: string,
  rating: number,
  comment: string
) {
  try {
    const response = await api.patch(
      `/api/public/reviews/${reviewId}`,
      { rating, comment },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteReview(token: string, reviewId: string) {
  try {
    const response = await api.delete(`/api/public/reviews/${reviewId}`, authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
