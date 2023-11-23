import validator from 'validator';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import sanitize from '../../utility/sanitize';
import { API_URL } from '../../utility/config';

const initialState = {
  isLoading: false,
  isError: null,
  isSignUp: false,
  isSignIn: false,
  pageType: 'onboard',
};

export const signup = createAsyncThunk('onboard/signup', async ({ email, password }, thunkAPI) => {
  try {
    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);

    // Validating if required fields exists & are not empty
    if (!sanitizedEmail || !sanitizedPassword) {
      throw new Error('Empty fields. Email & Password both required');
    }

    // Validating required fields are in correct & required format
    const errorMessage = [];
    if (!validator.isEmail(sanitizedEmail)) errorMessage.push('Invalid EmailId');
    if (!validator.isStrongPassword(sanitizedPassword)) {
      errorMessage.push('Invalid Password');
    }

    // If any error exists throwing new error with custom message
    if (errorMessage.length) throw new Error(errorMessage.join(', '));

    // Making request to create new user
    const response = await axios.post(`${API_URL}/user/signup`, { email: sanitizedEmail, password: sanitizedPassword });

    // Confirming if response code is 201(created) else throwing error
    if (response.status !== 201) throw new Error('Error creating user');

    // Resolving the function with success value
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
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
