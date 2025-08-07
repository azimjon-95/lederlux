// context/api/contactApi.js
import { api } from "./api";

export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (contactData) => ({
                url: "/contact/create",
                method: "POST",
                body: contactData,
            }),
            invalidatesTags: ["Contacts"],
        }),
        getContacts: builder.query({
            query: () => "/contact/all",
            providesTags: ["Contacts"],
        }),
        getContactById: builder.query({
            query: (id) => `/contact/get/${id}`,
            providesTags: ["Contacts"],
        }),
        updateContact: builder.mutation({
            query: ({ id, ...contactData }) => ({
                url: `/contact/update/${id}`,
                method: "PUT",
                body: contactData,
            }),
            invalidatesTags: ["Contacts"],
        }),

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contact/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Contacts"],
        }),
    }),
});

export const { useCreateContactMutation, useGetContactsQuery, useGetContactByIdQuery, useUpdateContactMutation, useDeleteContactMutation } = contactApi;


