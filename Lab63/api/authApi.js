// src/api/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;