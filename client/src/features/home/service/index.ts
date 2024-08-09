import { FormDataStatus } from "@/components/common/add-task";
import apiClient from "@/lib/apiClient";
import { Task } from "@/types/types";

export const getAllTaskApi = async () => {
  try {
    const response = await apiClient.get("/task");

    return response.data;
  } catch (error: any) {
    console.error("Fails to get task data Error", error.response.data);
    throw error.response.data;
  }
};

export const updateTaskApi = async (draggableId: string, status: string) => {
  try {
    const response = await apiClient.put(`/task/${draggableId}`, {
      status: status,
    });

    return response.data;
  } catch (error: any) {
    console.error("Fails to get task data Error", error.response.data);
    throw error.response.data;
  }
};

export const createTaskApi = async (data: FormDataStatus) => {
  try {
    const response = await apiClient.post("/task", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
