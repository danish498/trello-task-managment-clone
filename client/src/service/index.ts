import apiClient from "@/lib/apiClient";

export const logOutUser = async () => {
  try {
    const response = await apiClient.post("/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};
