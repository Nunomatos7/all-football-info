import { createSlice } from '@reduxjs/toolkit';

// Get the selected league from localStorage or default to "39" (Premier League)
const savedLeague = localStorage.getItem('selectedLeague') || "39";

const leagueSlice = createSlice({
  name: 'league',
  initialState: {
    selectedLeague: savedLeague, // Use saved league
  },
  reducers: {
    setLeague(state, action) {
      state.selectedLeague = action.payload;
      localStorage.setItem('selectedLeague', action.payload); // Save to localStorage
    },
  },
});

export const { setLeague } = leagueSlice.actions;

export default leagueSlice.reducer;
