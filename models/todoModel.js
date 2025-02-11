import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a Title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  date: {
    type: String,
    required: [true, "Please enter a date"],
  },
});

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);

export default Todo;
