import Goal from '../models/Goal.js';

export const getGoals = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

// ADD THIS BELOW getGoals
export const createGoal = async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
