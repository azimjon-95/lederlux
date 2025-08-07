// context/api/adminApi.js
import { api } from "./api";

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (adminData) => ({
                url: "/admin/create",
                method: "POST",
                body: adminData,
            }),
            invalidatesTags: ["Admins"],
        }),
        getAdmins: builder.query({
            query: () => "/admin/all",
            providesTags: ["Admins"],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, ...adminData }) => ({
                url: `/admin/update/${id}`,
                method: "PUT",
                body: adminData,
            }),
            invalidatesTags: ["Admins"],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admin/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admins"],
        }),
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: "/admin/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useCreateAdminMutation, useGetAdminsQuery, useUpdateAdminMutation, useDeleteAdminMutation, useLoginAdminMutation } = adminApi;



