import express from 'express';
import { getTasksByGoal, createTask } from '../controllers/taskController.js';
const router = express.Router();

router.get('/:goalId', getTasksByGoal);
router.post('/', createTask);  // <-- Add this POST route

export default router;
