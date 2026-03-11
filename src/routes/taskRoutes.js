const express = require('express');
const {
  getTasks,
  getTask,
  createNewTask,
  updateExistingTask,
  removeTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getTasks).post(createNewTask);

router.route('/:id').get(getTask).put(updateExistingTask).delete(removeTask);

module.exports = router;
