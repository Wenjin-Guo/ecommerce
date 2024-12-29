import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../../app/store/configureStore";
import { Product } from "../../app/models/product";
import { API_URLS } from "../../app/api/apiURLs";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>('products/fetchProducts',async(_,thunkAPI)=>{
    try {
        const response = await axios(API_URLS.products,{
            method:"get",
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = 'Failed to fetch the products';
      // Handle axios errors
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(errorMessage);
      }
      // Handle non-Axios errors (e.g., network issues)
      return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const fetchSingleProductAsync = createAsyncThunk<Product,number>('products/fetchSingleProduct',async(productId,thunkAPI)=>{
    try {
        const response = await axios(`${API_URLS.basket}/${productId}`,{
            method:"get",
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = 'Failed to fetch the product detail';
      // Handle axios errors
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(errorMessage);
      }
      // Handle non-Axios errors (e.g., network issues)
      return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const productSlice = createSlice({
    name:"products",
    initialState : productAdapter.getInitialState({
        prodcutsLoaded: false,
        status:'idle',
    }),
    reducers:{},
    extraReducers: (builder=>{
        builder.addCase(fetchProductsAsync.pending, (state)=>{
            state.status = "pending"
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state,action)=>{
            productAdapter.setAll(state,action.payload);
            state.status = 'succeeded';
            state.prodcutsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'failed';
        });
        builder.addCase(fetchSingleProductAsync.pending, (state)=>{
            state.status = "pending"
        });
        builder.addCase(fetchSingleProductAsync.fulfilled, (state,action)=>{
            productAdapter.setOne(state, action.payload);
            state.status = 'succeeded';
            state.prodcutsLoaded = true;
        });
        builder.addCase(fetchSingleProductAsync.rejected, (state,action)=> {
            console.log(action);
            state.status = 'failed';
        })
    })
});

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
} = productAdapter.getSelectors((state:AppState)=>state.productState);