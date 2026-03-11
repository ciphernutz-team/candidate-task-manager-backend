const Task = require('../models/Task');

// BUG 3: getAllTasks fetches every task in the database instead of filtering
// by the logged-in user's ID. The userId parameter is received but ignored.
const getAllTasks = async (userId) => {
  const tasks = await Task.find().populate('createdBy', 'name email');
  return tasks;
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId).populate('createdBy', 'name email');
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const createTask = async ({ title, description, status, dueDate, userId }) => {
  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    createdBy: userId,
  });
  return task;
};

// BUG 1: updateTask does not verify that the task belongs to the logged-in user.
// Any authenticated user can update any task by supplying its ID.
const updateTask = async (taskId, updates) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  task.title = updates.title ?? task.title;
  task.description = updates.description ?? task.description;
  task.status = updates.status ?? task.status;
  task.dueDate = updates.dueDate ?? task.dueDate;

  await task.save();
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  if (task.createdBy.toString() !== userId.toString()) {
    throw new Error('Not authorized to delete this task');
  }

  await task.deleteOne();
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
