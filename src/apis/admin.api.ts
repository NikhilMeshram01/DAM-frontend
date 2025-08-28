import type { AdminStats } from "../types";
import api from "./api";

export const getStats = async (): Promise<AdminStats> => {
  try {
    const res = await api.get("/api/v1/analytics");
    if (!res.data?.data) {
      throw new Error("Invalid response from server");
    }
    console.log(res.data.data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};
