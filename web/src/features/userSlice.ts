import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  status: 'loggedOut' | 'loggedIn';
  email?: string;
  error?: string;
};

const initialState: UserState = {
  status: 'loggedOut',
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoggedIn(state, action) {
        state.email = action.payload;
        state.status = 'loggedIn';
    },
    isLoggedOut(state) {
        state.email = undefined;
        state.status = 'loggedOut';
    },
  },
});

export const { isLoggedIn, isLoggedOut } = userSlice.actions;

export default userSlice.reducer;