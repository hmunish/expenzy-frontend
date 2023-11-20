import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: null,
  pageType: 'onboard',
};

const onboardSlice = createSlice({
  name: 'onboardSlice',
  initialState,
  reducers: {
    updatePageType(state, action) {
      state.pageType = action.payload;
    },
  },
});

export const { updatePageType } = onboardSlice.actions;
export default onboardSlice.reducer;
