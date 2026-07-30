import { api, getErrorMessage } from "./client";

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export interface AdminProductPayload {
  name: string;
  description: string;
  price: number;
  old_price?: number;
  discount_percent?: number;
  category_id: string;
  vendor_id?: string;
  main_image: string;
  gallery?: string[];
  tags?: string[];
  stock_qty: number;
  in_stock: boolean;
}

export async function createAdminProduct(token: string, payload: AdminProductPayload) {
  try {
    const response = await api.post("/api/public/admin/products", payload, authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateAdminProduct(
  token: string,
  id: string,
  payload: Partial<AdminProductPayload>
) {
  try {
    const response = await api.patch(`/api/public/admin/products/${id}`, payload, authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteAdminProduct(token: string, id: string) {
  try {
    const response = await api.delete(`/api/public/admin/products/${id}`, authHeaders(token));
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
