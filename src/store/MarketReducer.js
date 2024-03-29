import { createSlice } from "@reduxjs/toolkit";

const marketReducer = createSlice({
  name: "markets",
  initialState: {
    fixtureId: null,
    markets: [],
    leagueName: "",
  },
  reducers: {
    setMarkets: (state, action) => {
      state.markets = action.payload;
    },
    setFixtureId: (state, action) => {
      state.fixtureId = action.payload;
    },
    setLeagueName: (state, action) => {
      state.leagueName = action.payload;
    },
  },
});

export const { setMarkets, setFixtureId, setLeagueName } =
  marketReducer.actions;

export default marketReducer.reducer;
