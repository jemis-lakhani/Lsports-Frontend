import { configureStore } from "@reduxjs/toolkit";
import MarketReducer from "./MarketReducer";
import LoaderReducer from "./LoaderReducer";
import BetSlipReducer from "./BetSlipReducer";

const store = configureStore({
  reducer: {
    markets: MarketReducer,
    loader: LoaderReducer,
    bets: BetSlipReducer,
  },
});

export default store;
