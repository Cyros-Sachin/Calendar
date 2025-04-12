import Task from '../models/Task.js';

export const getTasksByGoal = async (req, res) => {
  const tasks = await Task.find({ goalId: req.params.goalId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};
