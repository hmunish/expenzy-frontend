import { API_URL } from "../../utility/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isSignIn: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
});

export default userSlice.reducer;
