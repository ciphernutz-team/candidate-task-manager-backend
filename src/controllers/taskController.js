const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../services/taskService');

// Missing Feature 1: No status filtering (?status=pending) implemented.
// Missing Feature 2: No pagination (?page=1&limit=10) implemented.
const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks(req.user._id);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const createNewTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = await createTask({
      title,
      description,
      status,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateExistingTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await updateTask(req.params.id, {
      title,
      description,
      status,
      dueDate,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    await deleteTask(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createNewTask, updateExistingTask, removeTask };
