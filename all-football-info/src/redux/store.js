import { configureStore } from '@reduxjs/toolkit';
import { footballApi } from '../api/footballApi';
import { teamDetailsApi } from '../api/teamDetailsApi';
import leagueReducer from './slices/leagueSlice';

const store = configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
    [teamDetailsApi.reducerPath]: teamDetailsApi.reducer,
    league: leagueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(footballApi.middleware)
      .concat(teamDetailsApi.middleware),
});

export default store;
