import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createTaskApi, getAllTaskApi, updateTaskApi } from ".";
import { FormDataStatus } from "@/components/common/add-task";

interface Task {
  id: string;
  title: string;
  content: string;
  priority: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;

  // Other task properties
}

interface Status {
  id: string;
  title: string;
  taskIds: string[];
}

interface TaskState {
  tasks: Record<string, Task>;
  statuses: Record<string, Status>;
  statusOrder: string[];
  loading: boolean;
  success: boolean;
  error?: string;
}

export const getAllTask = createAsyncThunk(
  "task/allTask",
  async (_, thunkApi) => {
    try {
      const response = await getAllTaskApi();

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (
    { draggableId, status }: { draggableId: string; status: string },
    thunkApi
  ) => {
    try {
      const response = await updateTaskApi(draggableId, status);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const createTask = createAsyncThunk(
  "task/createTask",
  async (data: FormDataStatus, thunkApi) => {
    try {
      const response = await createTaskApi(data);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: TaskState = {
  tasks: {},
  statuses: {},
  statusOrder: [],
  loading: false,
  success: false,
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handleDrag: (state, action) => {
      const { source, destination } = action.payload;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourceStatus = state.statuses[source.droppableId];
      const destinationStatus = state.statuses[destination.droppableId];

      const sourceTaskIds = Array.from(sourceStatus.taskIds);
      const [movedTask] = sourceTaskIds.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceTaskIds.splice(destination.index, 0, movedTask);
        const newStatus = {
          ...sourceStatus,
          taskIds: sourceTaskIds,
        };

        state.statuses[newStatus.id] = newStatus;
      } else {
        const destinationTaskIds = Array.from(destinationStatus.taskIds);
        destinationTaskIds.splice(destination.index, 0, movedTask);

        const newSourceStatus = {
          ...sourceStatus,
          taskIds: sourceTaskIds,
        };
        const newDestinationStatus = {
          ...destinationStatus,
          taskIds: destinationTaskIds,
        };

        state.statuses[newSourceStatus.id] = newSourceStatus;
        state.statuses[newDestinationStatus.id] = newDestinationStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTask.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.tasks = action.payload.tasks;
      state.statusOrder = action.payload.statusOrder;
      state.statuses = action.payload.statuses;
    });
    builder.addCase(getAllTask.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(createTask.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      const updatedTask = action.payload.task;
      const section = action.payload.section;

      state.tasks[updatedTask._id] = {
        id: updatedTask._id,
        content: updatedTask.description,
        title: updatedTask.title,
        priority: updatedTask.priority,
        deadline: updatedTask.deadline,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt,
      };

      state.statuses[section].taskIds.unshift(updatedTask._id);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
    });
  },
});

export const { handleDrag } = TaskSlice.actions;

export default TaskSlice.reducer;
