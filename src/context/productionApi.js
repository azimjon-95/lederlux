// context/api/productApi.js
import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData /* FormData */) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    getProducts: builder.query({
      query: () => "/product/all",
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/product/get/${id}`,
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/product/update/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
