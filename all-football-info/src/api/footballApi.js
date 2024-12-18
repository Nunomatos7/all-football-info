import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_API_KEY;

export const footballApi = createApi({
  reducerPath: 'footballApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', API_KEY);
      headers.set('X-RapidAPI-Host', 'api-football-v1.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMatches: builder.query({
      query: (leagueId) => `fixtures?league=${leagueId}&season=2024`,
    }),
    getTeams: builder.query({
      query: (leagueId) => `/teams?league=${leagueId}&season=2024`,
    }),
    getTeamDetails: builder.query({
      query: (teamId) => `/players/squads?team=${teamId}`, // Get full squad for a team
    }),
    getStandings: builder.query({
      query: (leagueId) => `/standings?league=${leagueId}&season=2024`,
    }),
    getLeagues: builder.query({
      query: () => `/leagues`, // Fetch all leagues
    }),
    getPlayers: builder.query({
      query: (teamId) => `/players?team=${teamId}&season=2024`, // Fetch players for a team
    }),
    getPlayerStats: builder.query({
      query: ({ playerId, season }) => `/players?id=${playerId}&season=${season}`,
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useGetTeamsQuery,
  useGetTeamDetailsQuery,
  useGetStandingsQuery,
  useGetLeaguesQuery,
  useGetPlayersQuery,
  useGetPlayerStatsQuery,
} = footballApi;
