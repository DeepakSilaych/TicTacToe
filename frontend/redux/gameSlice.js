import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',

  initialState:{
    turn: 0,
    board: '---------',
    gameStatus: {status: 0, result: null},
    gameId: null,
    player: 0,
  },

  reducers: {

    setTurn: (state, action) => {
      state.turn = action.payload;
    },

    setBoard: (state, action) => {
      state.board = action.payload;
    },

    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },

    setGameId: (state, action) => {
      state.gameId = action.payload;
    },

    setPlayer: (state, action) => {
      state.player = action.payload;
    },
  },
});


export const { setTurn, setBoard, setGameStatus, setGameId, setPlayer} = gameSlice.actions;
export default gameSlice.reducer;

