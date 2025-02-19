// import { createSlice } from '@reduxjs/toolkit'

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: null,
//   },
//   reducers: {

//     storeUser: (state, action) => {
//       console.log("ACTION", action);
//       state.user = action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { storeUser } = userSlice.actions

// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    profileImage: null, // Add profileImage to initialState
  },
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUser, updateProfileImage } = userSlice.actions;

export default userSlice.reducer;
