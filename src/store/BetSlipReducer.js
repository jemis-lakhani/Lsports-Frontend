import { createSlice } from "@reduxjs/toolkit";

const betSlipReducer = createSlice({
  name: "bets",
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
      // console.log(state.slips);
    },
    setBets: (state, action) => {
      const { market, bets, fixtureId, fixture, selectedBet } = action.payload;
      // Get the current bets array for the provided slip key, or initialize an empty array if it doesn't exist
      const currentBets = state.bets[state.currentSlip] || {};
      // Update the bet object with the new fixture and bet based on the provided fixtureId
      state.bets[state.currentSlip] = {
        ...currentBets,
        [fixtureId]: {
          market,
          fixtureId,
          fixture,
          bets,
          selectedBet,
        },
      };
    },
  },
});

export const { setCurrentSlip, setSlips, deleteSlip, setBets } =
  betSlipReducer.actions;

export default betSlipReducer.reducer;
