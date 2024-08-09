const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = Schema(
  {
    status: {
      type: String,
      enum: ["To do", "In progress", "Under review", "Finished"],
      default: "To do",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "urgent"],
      default: "medium",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: Number,
      // required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
