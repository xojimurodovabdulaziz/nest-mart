import { api, getErrorMessage } from "./client";
import { getVendorsList } from "./vendors";

function authHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function getPendingVendors() {
  try {
    const res = await getVendorsList();
    const vendors = res?.data?.vendors || [];
    return vendors.filter((v: any) => v.status === "pending");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getAllVendors() {
  try {
    const res = await getVendorsList();
    return res?.data?.vendors || [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

interface NewVendorPayload {
  store_name: string;
  owner_name: string;
  email: string;
  phone: string;
  logo?: string;
}

export async function addVendorByAdmin(token: string, payload: NewVendorPayload) {
  try {
    const created = await api.post("/api/public/vendors", payload);
    const vendorId = created?.data?.data?.vendor?.id;
    if (vendorId) {
      await approveVendor(token, vendorId);
    }
    return created.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function approveVendor(token: string, vendorId: string) {
  try {
    const response = await api.patch(
      `/api/public/admin/vendors/${vendorId}`,
      { status: "approved" },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function rejectVendor(token: string, vendorId: string) {
  try {
    const response = await api.patch(
      `/api/public/admin/vendors/${vendorId}`,
      { status: "rejected" },
      authHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
