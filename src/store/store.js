import { configureStore } from "@reduxjs/toolkit";
import MarketReducer from "./MarketReducer";
import LoaderReducer from "./LoaderReducer";
import BetSlipReducer from "./BetSlipReducer";
import MobileViewReducer from "./MobileViewReducer";

const store = configureStore({
  reducer: {
    markets: MarketReducer,
    loader: LoaderReducer,
    betSlip: BetSlipReducer,
    mobileView: MobileViewReducer,
  },
});

export default store;
