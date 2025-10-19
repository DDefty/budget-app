import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  status: 'loggedOut' | 'loggedIn';
  email?: string;
  name?: string;
  id?: string;
  error?: string;
  gender?: string;
  birth_date?: Date;
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
      state.gender = action.payload.gender;
      state.birth_date = action.payload.birth_date;
      state.status = 'loggedIn';
    },
    isLoggedOut(state) {
      state.email = undefined;
      state.id = undefined;
      state.name = undefined;
      state.gender = undefined;
      state.birth_date = undefined;
      state.status = 'loggedOut';
    },
  },
});

export const { isLoggedIn, isLoggedOut } = userSlice.actions;

export default userSlice.reducer;