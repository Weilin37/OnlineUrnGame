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

// Submit Quiz Answers
export const submitQuiz = createAsyncThunk("game/submitQuiz", async (endpoint, thunkAPI) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Submit Finish Quiz
export const finishQuiz = createAsyncThunk("game/finishQuiz", async (endpoint, thunkAPI) => {
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

// Update player ready
export const sendReady = createAsyncThunk("game/sendReady", async (endpoint, thunkAPI) => {
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
    instructions_read: false,
    current_turn: '',
    current_round: 0,
    game_ended: false,
    both_submitted: false,
    both_online: false,
    both_ready_for_next: false,
    both_quiz_finished: false,
    treatment: '',
    alias: '',
    player: '',
    room: '',
  },
  reducers: {
    setAlias: (state, action) => {state.alias = action.payload},
    setPlayer: (state, action) => {state.player = action.payload},
    setGameWaiting: (state, action) => {state.game_waiting = action.payload},
    setGameCreated: (state, action) => {state.game_created = action.payload},
    setInstructions: (state, action) => {
        state.instructions = action.payload;
        state.instructions_read = true;
    },
  },
  extraReducers: (builder) => {
    // getData
    builder.addCase(getData.fulfilled, (state, { payload }) => {
        state.data = payload;
        if (payload.length > 0) {
            var player1action = state.data[state.data.length - 1]['player1action'];
            var player2action = state.data[state.data.length - 1]['player2action'];

            var player1online = state.data[state.data.length - 1]['player1_online'];
            var player2online = state.data[state.data.length - 1]['player2_online'];

            var player1_ready = state.data[state.data.length - 1]['player1_ready'];
            var player2_ready = state.data[state.data.length - 1]['player2_ready'];

            var player1_quiz_finished = state.data[state.data.length - 1]['player1_quiz_finished'];
            var player2_quiz_finished = state.data[state.data.length - 1]['player2_quiz_finished'];

            state.treatment = state.data[state.data.length - 1]['treatment'];
            state.current_round = parseInt(state.data[state.data.length - 1]['round']);

            if (!player1action && !player2action) {
                state.current_turn = 'player1';
                state.both_submitted = false;
            } else if (player1action && !player2action) {
                state.current_turn = 'player2';
                state.both_submitted = false;
            } else if (player1action && player2action) {
                state.current_turn = 'done';
                state.both_submitted = true;
                if (state.current_round === 10) {state.game_ended = true;}
            } else {
                state.current_turn = 'error';
                state.both_submitted = false;
            }

            if (player1online && player2online) {state.both_online = true}
            else {state.both_online = false}

            if (player1_ready && player2_ready) {state.both_ready_for_next = true}
            else {state.both_ready_for_next = false}

            if (player1_quiz_finished && player2_quiz_finished) {state.both_quiz_finished = true}
            else {state.both_quiz_finished = false}

        }
    });

    // get new game
    builder.addCase(getNewGame.fulfilled, (state, { payload }) => {
        state.game_waiting_data = payload;
        if (payload.length > 0) {
            state.room = payload[0]['room'];
            state.treatment = state.data[state.data.length - 1]['treatment'];
        }
    });

    // resume game
    builder.addCase(resumeGame.fulfilled, (state, { payload }) => {
        if (payload.length > 0) {
            state.room = payload[0]['room'];
            state.treatment = state.data[state.data.length - 1]['treatment'];
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
            state.room = payload[0]['room'];
            state.treatment = state.data[state.data.length - 1]['treatment'];
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