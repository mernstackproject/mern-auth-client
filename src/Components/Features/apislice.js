import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../Baseurl";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/found-user",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth")}`, // Ensure `token` is defined
        },
      }),
    }),
  }),
});
export const { useGetUsersQuery } = apiSlice;
