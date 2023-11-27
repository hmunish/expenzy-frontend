import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utility/config';

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  isUpdated: true,
  transactions: [],
  totalIncome: 0,
  totalExpense: 0,
};

export const fetchTotals = createAsyncThunk('dashboard/fetchTotals', async (_, thunkAPI) => {
  try {
    const { dashboard } = thunkAPI.getState();
    // Checking if transactions are updated if false returning with previous totals
    if (!dashboard.isUpdated) {
      const { totalIncome, totalExpense } = dashboard;
      return thunkAPI.fulfillWithValue({ income: totalIncome, expense: totalExpense });
    }
    const response = await axios.get(`${API_URL}/expense/total`);
    if (response.status !== 200) throw new Error('Error fetching totals');
    console.log(response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
  }
});

export const fetchTransactions = createAsyncThunk('dashboard/fetchTransactions', async (n, thunkAPI) => {
  try {
    const { dashboard } = thunkAPI.getState();
    // Checking if transactions are updated if false returning with previous transactions
    if (!dashboard.isUpdated) {
      const { transactions } = dashboard;
      return thunkAPI.fulfillWithValue(transactions);
    }
    const response = await axios.get(`${API_URL}/expense/?limit=${n}`);
    if (response.status !== 200) throw new Error('Error fetching transactions');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
  }
});

export const addTransaction = createAsyncThunk('dashboard/addTransaction', async ({ amount, category, description }, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/expense`, { amount, category, description });
    if (response.status !== 201) throw new Error('Error adding transaction');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
  }
});

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = null;
    },
    switchOffIsUpdated: (state) => {
      state.isUpdated = false;
    },
    switchOnIsUpdated: (state) => {
      state.isUpdated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotals.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = null;
      state.totalIncome = action.payload.income;
      state.totalExpense = action.payload.expense;
    });
    builder.addCase(fetchTotals.pending, (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchTotals.rejected, (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = action.payload;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = null;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = action.payload;
    });
    builder.addCase(addTransaction.fulfilled, (state) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = null;
    });
    builder.addCase(addTransaction.pending, (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { resetState, switchOnIsUpdated, switchOffIsUpdated } = dashboardSlice.actions;
export default dashboardSlice.reducer;
