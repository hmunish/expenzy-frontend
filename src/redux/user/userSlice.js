import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utility/config';
import { getLocalStorageAuthToken } from '../../utility/helper';

const initialState = {
  isLoading: false,
  isError: null,
  isAuthorized: false,
  userAuthToken: getLocalStorageAuthToken(),
};

export const authorizeUser = createAsyncThunk(
  'user/authorizeUser',
  async (_, thunkAPI) => {
    try {
      const { userAuthToken } = thunkAPI.getState().user;
      if (!userAuthToken) throw new Error('No authentication found');
      axios.defaults.headers.common.Authorization = userAuthToken;
      const response = await axios.get(`${API_URL}/user`);
      if (response.status === 200) return thunkAPI.fulfillWithValue(response.data);
      throw new Error('User not authorized');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authorizeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.isAuthorized = true;
      state.profile = action.payload;
    });
    builder.addCase(authorizeUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authorizeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthorized = false;
      state.isError = action.payload;
    });
  },
});

export default userSlice.reducer;
