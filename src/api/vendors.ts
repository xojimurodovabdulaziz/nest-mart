import { api, getErrorMessage } from "./client";

export async function subscribeNewsletter(email: string) {
  try {
    const response = await api.post("/api/public/newsletter", { email });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

interface VendorPayload {
  store_name: string;
  owner_name: string;
  email: string;
  phone: string;
  logo?: string;
}

export async function registerVendor(payload: VendorPayload) {
  try {
    const response = await api.post("/api/public/vendors", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getVendorsList() {
  try {
    const response = await api.get("/api/public/vendors");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
