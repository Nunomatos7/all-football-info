import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamDetailsApi = createApi({
  reducerPath: 'teamDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://v3.football.api-sports.io',
    prepareHeaders: (headers) => {
      headers.set('x-apisports-key', 'dc74f7d5a8c2a6455b09325dd17c2898');
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
