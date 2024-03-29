import { createSlice } from "@reduxjs/toolkit";

const betSlipReducer = createSlice({
  name: "betSlip",
  initialState: {
    slips: [1],
    bets: {},
    currentSlip: 1,
  },
  reducers: {
    setCurrentSlip: (state, action) => {
      state.currentSlip = parseInt(action.payload);
    },
    setSlips: (state, action) => {
      state.slips.push(parseInt(action.payload));
    },
    deleteSlip: (state, action) => {
      const slipToDelete = parseInt(action.payload);
      state.slips = state.slips.filter((slip) => slip !== slipToDelete);
      state.bets[slipToDelete] = {};
      const newCurrentSlip =
        state.slips && state.slips.length > 0
          ? state.slips[state.slips.length - 1]
          : 0;
      state.currentSlip = newCurrentSlip;
    },
    deleteBet: (state, action) => {
      const { fixtureId } = action.payload;
      delete state.bets[state.currentSlip][fixtureId];
    },
    setBets: (state, action) => {
      const { market, bets, fixtureId, fixture, selectedBetId, baseLine } =
        action.payload;
      if (state.slips.length === 0) {
        state.slips.push(1);
        state.currentSlip = 1;
      }
      const currentBets = state.bets[state.currentSlip] || {};
      if (currentBets[fixtureId]?.selectedBetId === selectedBetId) {
        delete currentBets[fixtureId];
      } else {
        state.bets[state.currentSlip] = {
          ...currentBets,
          [fixtureId]: {
            market,
            fixtureId,
            fixture,
            bets,
            selectedBetId,
            baseLine,
          },
        };
      }
    },
  },
});

export const { setCurrentSlip, setSlips, deleteSlip, setBets, deleteBet } =
  betSlipReducer.actions;

export default betSlipReducer.reducer;
