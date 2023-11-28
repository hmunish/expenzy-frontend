import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utility/config';

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  isUpdated: true,
  isMoreTransactions: true,
  transactions: [],
  totalIncome: 0,
  totalExpense: 0,
  page: 1,
  limit: 5,
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
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
  }
});

export const fetchTransactions = createAsyncThunk('dashboard/fetchTransactions', async (_, thunkAPI) => {
  try {
    const { dashboard } = thunkAPI.getState();
    // Checking if transactions are updated if false returning with no value
    if (!dashboard.isUpdated) {
      return thunkAPI.fulfillWithValue('no value');
    }
    const response = await axios.get(`${API_URL}/expense/?limit=${dashboard.limit}&page=${dashboard.page}`);
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
    resetDashboard: () => initialState,
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
      if (action.payload.length === 0) {
        state.isMoreTransactions = false;
      } else if (action.payload !== 'no value') {
        state.page += 1;
        state.isMoreTransactions = true;
        state.transactions = [...state.transactions, ...action.payload];
      }
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
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = null;
      state.page = 1;
      state.isUpdated = true;
      if (action.payload.amount < 0) state.totalExpense += Math.abs(action.payload.amount);
      else state.totalIncome += +action.payload.amount;
      state.transactions = [];
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

export const {
  resetState, switchOnIsUpdated, switchOffIsUpdated, resetDashboard,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
