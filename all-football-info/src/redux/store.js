import { configureStore } from '@reduxjs/toolkit';
import { footballApi } from '../api/footballApi';
import leagueReducer from './slices/leagueSlice';

const store = configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
    league: leagueReducer, // Add league slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(footballApi.middleware),
});

export default store;
