import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import process from 'process';

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
  }),
});

export const { useGetMatchesQuery } = footballApi;
