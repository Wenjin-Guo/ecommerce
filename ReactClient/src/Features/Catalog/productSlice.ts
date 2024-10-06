import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import axios from "axios";
import { AppState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductAsync = createAsyncThunk<Product[]>('products/fetchProducts',async()=>{
    try {
        const response = await axios('http://localhost:5000/api/products',{
            method:"get",
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
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
        builder.addCase(fetchProductAsync.pending, (state)=>{
            state.status = "pending"
        });
        builder.addCase(fetchProductAsync.fulfilled, (state,action)=>{
            productAdapter.setAll(state,action.payload);
            state.status = 'succeeded';
            state.prodcutsLoaded = true;
        });
        builder.addCase(fetchProductAsync.rejected, (state)=>{
            state.status = 'failed';
        })
    })
});

export const productSelectors = productAdapter.getSelectors((state:AppState)=>state.productState);