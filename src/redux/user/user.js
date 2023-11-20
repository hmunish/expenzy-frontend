import { createSlice } from '@reduxjs/toolkit';
// import { API_URL } from '../../utility/config';

const initialState = {
  isSignIn: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
});

export default userSlice.reducer;
