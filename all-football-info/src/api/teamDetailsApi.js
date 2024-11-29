import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const NEW_API_KEY = process.env.REACT_APP_NEW_API_KEY;

export const teamDetailsApi = createApi({
  reducerPath: 'teamDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://v3.football.api-sports.io',
    prepareHeaders: (headers) => {
      headers.set('x-apisports-key', NEW_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeamDetails: builder.query({
      query: (teamId) => ({
        url: `teams`,
        params: { id: teamId },
      }),
    }),
  }),
});

export const { useGetTeamDetailsQuery } = teamDetailsApi;
