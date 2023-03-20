import { combineReducers } from "redux";

// Import all reducers
import nftaReducer from "./nftaReducer";

const reducers = combineReducers({
  nfta: nftaReducer
})

export default reducers;