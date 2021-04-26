import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Create New Game
export const createNewGame = createAsyncThunk("game/createNewGame", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Join New Game
export const joinGame = createAsyncThunk("game/joinGame", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// ResumeGame
export const resumeGame = createAsyncThunk("game/resumeGame", async (endpoint, thunkAPI) => {
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

// Update waiting room
export const updateWaitingRoom = createAsyncThunk("game/updateWaitingRoom", async (endpoint, thunkAPI) => {
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

// Create New Round
export const createNewRound = createAsyncThunk("game/createNewRound", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Update online status
export const updateOnlineStatus = createAsyncThunk("game/updateOnlineStatus", async (endpoint, thunkAPI) => {
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
    instructions: true,
    current_turn: '',
    alias: '',
    player: '',
    room: '',
  },
  reducers: {
    setAlias: (state, action) => {state.alias = action.payload},
    setPlayer: (state, action) => {state.player = action.payload},
    setGameWaiting: (state, action) => {state.game_waiting = action.payload},
    setGameCreated: (state, action) => {state.game_created = action.payload},
    setInstructions: (state, action) => {state.instructions = action.payload},
  },
  extraReducers: (builder) => {
    // getData
    builder.addCase(getData.fulfilled, (state, { payload }) => {
        state.data = payload;
        if (payload.length > 0) {
            var player1action = state.data[state.data.length - 1]['player1action'];
            var player2action = state.data[state.data.length - 1]['player2action'];

            if (!player1action && !player2action) {state.current_turn = 'player1'}
            else if (player1action && !player2action) {state.current_turn = 'player2'}
            else if (player1action && player2action) {state.current_turn = ''}
            else {state.current_turn = 'error'}
        }
    });

    // get new game
    builder.addCase(getNewGame.fulfilled, (state, { payload }) => {
        state.game_waiting_data = payload;
        if (payload.length > 0) {
            state.room = payload[0]['room']
        }
    });

    // resume game
    builder.addCase(resumeGame.fulfilled, (state, { payload }) => {
        if (payload.length > 0) {
            state.room = payload[0]['room']
            if (payload[0]['player1name'] === payload[0]['current_alias']) {
                state.player = 'player1'
            } else if (payload[0]['player2name'] === payload[0]['current_alias']) {
                state.player = 'player2'
            }

            if (state.player.length > 0) {
                state.game_created = true;
                state.game_waiting = false;
            }
        }
    });

    // Update waiting room
    builder.addCase(updateWaitingRoom.fulfilled, (state, { payload }) => {
        state.game_waiting_data = payload;
        if (payload.length > 0) {
            state.room = payload[0]['room']
            if (payload[0]['both_online']) {
                state.game_created = true;
                state.game_waiting = false;
            }
        }
    });
  }
});

export const { setAlias, setPlayer, setGameCreated, setGameWaiting, setInstructions } = gameSlice.actions;

export default gameSlice