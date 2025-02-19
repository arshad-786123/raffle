import { createSlice } from "@reduxjs/toolkit";

export const raffleSlice = createSlice({
  name: "raffle",
  initialState: {
    liveRaffle: [],
    ExpiredRaffle: [],
  },
  reducers: {
    storeLiveRaffle: (state, action) => {
      state.liveRaffle = action.payload;
    },
    storeExpiredRaffle: (state, action) => {
      state.liveRaffle = action.payload;
    },
  },
});

export const { storeExpiredRaffle, storeLiveRaffle } = raffleSlice.actions;

export default raffleSlice.reducer;
