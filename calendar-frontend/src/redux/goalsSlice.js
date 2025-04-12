import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/goals';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      state.goals = action.payload;
    });
  },
});

export default goalsSlice.reducer;
