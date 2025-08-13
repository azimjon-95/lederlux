import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// Bazaviy query — token bilan avtomatik headerga qo‘shiladi
const baseQuery = fetchBaseQuery({
  baseUrl: "https://liderlux-two.vercel.app/api", // API bazaviy manzili
  // baseUrl: "http://localhost:8080/api", // API bazaviy manzili
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Retry bilan o‘rash — 2 marta qayta urinish imkoniyati
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

// RTK Query API obyektini yaratish
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Contacts", "Products", "Admins"], // kerakli taglar
  endpoints: () => ({}), // endpointlar keyinchalik qo‘shiladi
});
