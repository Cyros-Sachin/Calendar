import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://calendar-seven-weld.vercel.app/api/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (goalId) => {
  const response = await axios.get(`${API_URL}/${goalId}`);
  return response.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export default tasksSlice.reducer;
