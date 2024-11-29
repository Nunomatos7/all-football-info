import { configureStore } from '@reduxjs/toolkit';
import { footballApi } from '../api/footballApi';
import { teamDetailsApi } from '../api/teamDetailsApi'; // Import the new API slice
import leagueReducer from './slices/leagueSlice';

const store = configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
    [teamDetailsApi.reducerPath]: teamDetailsApi.reducer, // Add the new reducer
    league: leagueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(footballApi.middleware)
      .concat(teamDetailsApi.middleware), // Add the new middleware
});

export default store;
