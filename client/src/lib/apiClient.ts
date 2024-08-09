"use client";

import {
  handleRequestError,
  handleResponseError,
} from "@/utils/error-handlers";
import { utilityFunction } from "@/utils/helper";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";


// Create an Axios instance for API requests

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
});

apiClient.interceptors.request.use(
  async (config) => {
    // const token = getCookies("accessToken");

    // console.log(token);

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    console.log("cheasdfadsfads", token);

    // let token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => handleRequestError(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => handleResponseError(error)
);

export default apiClient;
