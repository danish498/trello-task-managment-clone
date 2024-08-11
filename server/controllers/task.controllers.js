const Task = require("../models/task.models");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const statusMapping = {
  "To do": "status-1",
  "In progress": "status-2",
  "Under review": "status-3",
  Finished: "status-4",
};

const getAllTask = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const tasks = await Task.find({
    user: user._id,
  });

  if (tasks.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { data: tasks }, "No data found"));
  }

  const statuses = {
    "status-1": { id: "status-1", title: "To do", taskIds: [] },
    "status-2": { id: "status-2", title: "In progress", taskIds: [] },
    "status-3": { id: "status-3", title: "Under review", taskIds: [] },
    "status-4": { id: "status-4", title: "Finished", taskIds: [] },
  };

  const tasksById = {};

  tasks.forEach((task) => {
    tasksById[task._id] = {
      id: task._id,
      content: task.description, // Use description as content
      title: task.title,
      priority: task.priority,
      deadline: task.deadline,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    statuses[statusMapping[task.status]].taskIds.unshift(task._id.toString());
  });

  const statusOrder = ["status-1", "status-2", "status-3", "status-4"];

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { tasks: tasksById, statuses, statusOrder },
        " task data fetched successfully"
      )
    );
});

const createTask = asyncHandler(async (req, res, next) => {
  const { status, priority, deadline, description, title } = req.body;
  const user = req.user;

  const task = new Task({
    status,
    priority,
    deadline,
    description,
    title,
    user: user._id,
  });

  await task.save();

  const statusTitle = statusMapping[task.status];

  console.log("check hte status title", statusTitle);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { task, section: statusTitle },
        "task has been created"
      )
    );
});

const updateTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      status,
    },
    {
      new: true,
    }
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

module.exports = { getAllTask, createTask, updateTask };
