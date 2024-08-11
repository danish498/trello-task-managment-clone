import apiClient from "@/lib/apiClient";
import { userAuthSchema } from "@/lib/validations/auth";
import { z } from "zod";
type FormData = z.infer<typeof userAuthSchema>;
import { setCookie } from "cookies-next";

export const logInApi = async (data: FormData) => {
  try {
    const response = await apiClient.post(`/login`, data, {
      withCredentials: true,
    });

    console.log("check the response", response.data);

    setCookie("accessToken", response.data.data.token);
    return response.data;
  } catch (error: any) {
    console.error("Fails to get task data Error", error.response.data);
    throw error.response.data;
  }
};
