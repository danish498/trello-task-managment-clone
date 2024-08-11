import apiClient from "@/lib/apiClient";
import { TRegisterSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { setCookie } from "cookies-next";
import { getFirstName } from "@/utils/helper";

export const registrationApi = async (data: TRegisterSchema) => {
  console.log("check reg", data);

  try {
    const response = await apiClient.post(`/register`, data, {
      withCredentials: true,
    });

    const { fullName } = response.data.data.user;
    setCookie("name", fullName);

    setCookie("accessToken", response.data.data.token);
    return response.data;
  } catch (error: any) {
    console.error("Fails to get task data Error", error.response.data);
    throw error.response.data;
  }
};
