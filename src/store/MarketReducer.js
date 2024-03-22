import { createSlice } from "@reduxjs/toolkit";

const marketReducer = createSlice({
  name: "markets",
  initialState: {
    fixtureId: null,
    markets: [],
  },
  reducers: {
    setMarkets: (state, action) => {
      state.markets = action.payload;
    },
    setFixtureId: (state, action) => {
      state.fixtureId = action.payload;
    },
  },
});

export const { setMarkets, setFixtureId } = marketReducer.actions;

export default marketReducer.reducer;
