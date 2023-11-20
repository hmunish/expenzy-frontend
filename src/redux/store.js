import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import onBoardReducer from './onboard/onboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    onboard: onBoardReducer,
  },
});

export default store;
