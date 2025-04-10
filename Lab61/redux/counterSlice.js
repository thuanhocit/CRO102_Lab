import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const RESET_COUNTER = { type: 'RESET_COUNTER' };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    multiply: {
      reducer: (state, action) => {
        state.value *= action.payload;
      },
      prepare: (value) => ({ payload: value || 2 }),
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === RESET_COUNTER.type,
      () => initialState
    );
  },
});

export const { increment, decrement, multiply } = counterSlice.actions;

export default counterSlice.reducer;
