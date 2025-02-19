import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../constants/api';

export const accountMutationSlice = createApi({
  reducerPath: 'accountMutationApi',
  baseQuery,
  // tagTypes:["Auth"],
  endpoints: (builder) => ({
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: '/accounts/profile-picture',
        method: 'PUT',
        body,
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: '/students/change-password',
        method: 'PUT',
        body,
      }),
    }),
    updateBio: builder.mutation({
      query: (body) => ({
        url: '/accounts/bio',
        method: 'PUT',
        body,
      }),
    }),
    getAllAccounts: builder.query({
      query: ({ accountType, searchTerm, page, limit = 16 }) => ({
        url:
          searchTerm && accountType
            ? `/accounts?category=${accountType}&searchTerm=${searchTerm}&isPaginated=true&page=${page}&limit=${limit}`
            : !accountType && searchTerm
            ? `/accounts?searchTerm=${searchTerm}&isPaginated=true&page=${page}&limit=${limit}`
            : accountType && !searchTerm
            ? `/accounts?category=${accountType}&isPaginated=true&page=${page}&limit=${limit}`
            : `/accounts?&isPaginated=true&page=${page}&limit=${limit}`,
        // url: `/accounts?category=${accountType}&searchTerm=${searchTerm}&isPaginated=true&page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    getSearchedAccounts: builder.query({
      query: (searchTerm) => ({
        url: `/accounts?searchTerm=${searchTerm}&isPaginated=true`,
        method: 'GET',
      }),
    }),
    getAccountsByCategory: builder.query({
      query: (accountType) => ({
        url: `/accounts/category=${accountType}`,
        method: 'GET',
      }),
    }),
    getAccountsByCategory: builder.query({
      query: (accountType) => ({
        url: `/accounts/category=${accountType}`,
        method: 'GET',
      }),
    }),
    getAccountById: builder.query({
      query: (accountId) => ({
        url: `/accounts/${accountId}`,
        method: 'GET',
      }),
    }),
    updateDetails: builder.mutation({
      query: (body) => ({
        url: '/accounts',
        method: 'PUT',
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfilePictureMutation,
  useUpdateBioMutation,
  useGetAllAccountsQuery,
  useGetAccountByIdQuery,
  useUpdateDetailsMutation,
  useGetAccountsByCategoryQuery,
  useGetSearchedAccountsQuery,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
} = accountMutationSlice;
