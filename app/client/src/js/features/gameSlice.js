import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Get New Game
export const createNewGame = createAsyncThunk("game/createNewGame", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Get New Game
export const getNewGame = createAsyncThunk("game/getNewGame", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Get Game Data
export const getData = createAsyncThunk("game/getData", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Send Game Data
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
    game_waiting_data: [],
    game_created: false,
    game_waiting: false,
    alias: '',
    player: '',
    room: '',
  },
  reducers: {
    setAlias: (state, action) => {state.alias = action.payload},
    setPlayer: (state, action) => {state.player = action.payload},
  },
  extraReducers: (builder) => {
    // getData
    builder.addCase(getData.fulfilled, (state, { payload }) => {
        state.data = payload;
    });

    // get new game
    builder.addCase(getNewGame.fulfilled, (state, { payload }) => {
        state.game_waiting_data = payload;
        if (payload.length > 0) {state.room = payload[0]['room']}
    });
  }
});

export const { setAlias, setPlayer } = gameSlice.actions;

export default gameSlice