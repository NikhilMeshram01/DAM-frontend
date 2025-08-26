import type { User } from "../types";
import api from "./api";

const API_BASE = "api/v1/users";

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const res = await api.post(
      `${API_BASE}/login`,
      { email, password },
      { withCredentials: true }
    );
    if (!res.data?.user) {
      throw new Error("Invalid response from server");
    }
    return res.data.user as User;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<User> => {
  try {
    const userData = { name, email, password, confirmPassword };
    const res = await api.post(`${API_BASE}/register`, userData, {
      withCredentials: true,
    });

    if (!res.data?.user) {
      throw new Error("Invalid response from server");
    }

    return res.data.user as User;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to register user"
    );
  }
};

export const logoutUser = async (): Promise<void> => {
  await api.post(`${API_BASE}/logout`, {}, { withCredentials: true });
};

// export const getProfile = async (): Promise<User> => {
//   const response: AxiosResponse<User> = await api.get("/auth/profile");
//   return response.data;
// };
