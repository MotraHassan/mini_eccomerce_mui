import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Get All Data
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mini-eccomerce.onrender.com' }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: () => `products`,
    }),
  }),
})

// Get only one Product
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mini-eccomerce.onrender.com' }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (name) => `product/${name}`,
    }),
  }),
})


export const { useGetproductsByNameQuery } = productsApi
export const { useGetOneProductQuery} = productApi