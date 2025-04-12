import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response = await axios.get('http://localhost:5000/api/events');
    return response.data.map((event) => ({
        ...event,
        id: event._id, // <-- ADD THIS
    }));
});

export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
    const response = await axios.post(API_URL, event);
    return response.data;
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event, { dispatch }) => {
    const response = await axios.put(`http://localhost:5000/api/events/${event._id}`, event);
    dispatch(fetchEvents());   // <-- Refresh the events after updating
    return response.data;
  });
  
  
export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.events = action.payload;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event._id !== action.payload);
            })

            .addCase(updateEvent.fulfilled, (state, action) => {
                const index = state.events.findIndex(e => e._id === action.payload._id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            });
    },
});

export default eventsSlice.reducer;
