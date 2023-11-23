import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: null,
  isSignUp: false,
  isSignIn: false,
  pageType: 'onboard',
};

export const signup = createAsyncThunk('onboard/signup', async ({ email, password }, thunkAPI) => {
  try {
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const onboardSlice = createSlice({
  name: 'onboardSlice',
  initialState,
  reducers: {
    updatePageType(state, action) {
      state.pageType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSignUp = true;
    });
    builder.addCase(signup.pending, (state) => {
      state.isSignUp = false;
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isSignUp = false;
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { updatePageType } = onboardSlice.actions;
export default onboardSlice.reducer;
