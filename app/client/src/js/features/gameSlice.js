import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// CREATE Thunk
export const getData = createAsyncThunk("game/getData", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// CREATE Thunk
export const sendData = createAsyncThunk("game/sendData", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});


// CREATE SLICE
const gameSlice = createSlice({
  name: "game",
  initialState: {
    data: [],
    room: 'abc',
    player1turn: true,
    player2turn: false,
    endpoint: "/api/get/readgame",
  },
  reducers: {
    setEndpoint: (state, action) => {state.endpoint = "/api/get/readgame"},
  },
  extraReducers: (builder) => {
    // getData
    builder.addCase(getData.pending, (state) => {
        //state.data = [];
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
        state.data = payload;
    });
    builder.addCase(getData.rejected,(state, action) => {
        state.loading = false;
    });
  }
});

export const { setEndpoint } = gameSlice.actions;

export default gameSlice