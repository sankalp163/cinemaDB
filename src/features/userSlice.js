import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  list: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addToUserList(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { login, logout, addToUserList } = userSlice.actions;

export const selectUser = (state) => state.users.user;

export default userSlice.reducer;
