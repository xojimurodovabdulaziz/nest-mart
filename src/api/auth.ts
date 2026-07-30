import { api, getErrorMessage } from "./client";

export async function registerUser(email: string, password: string, full_name: string) {
  try {
    const response = await api.post("/api/public/auth/register", { email, password, full_name });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/api/public/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getMe(token: string) {
  try {
    const response = await api.get("/api/public/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
