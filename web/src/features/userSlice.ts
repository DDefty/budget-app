import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  status: 'loggedOut' | 'loggedIn';
  email?: string;
  name?: string;
  id?: string;
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
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.name = action.payload.name;
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