import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import onBoardReducer from './onboard/onboardSlice';
import dashboardReducer from './dashboard/dashboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    onboard: onBoardReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
