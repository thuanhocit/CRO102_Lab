import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import imageReducer from "./imageSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    image: imageReducer,
});

export default rootReducer;