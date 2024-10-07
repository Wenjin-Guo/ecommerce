import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../../app/store/configureStore";
import { Product } from "../../app/models/product";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>('products/fetchProducts',async()=>{
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

export const fetchSingleProductAsync = createAsyncThunk<Product,number>('products/fetchSingleProduct',async(productId:number)=>{
    try {
        const response = await axios(`http://localhost:5000/api/products/${productId}`,{
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
        builder.addCase(fetchProductsAsync.pending, (state)=>{
            state.status = "pending"
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state,action)=>{
            productAdapter.setAll(state,action.payload);
            state.status = 'succeeded';
            state.prodcutsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state)=>{
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
        builder.addCase(fetchSingleProductAsync.rejected, (state)=>{
            state.status = 'failed';
        })
    })
});

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
} = productAdapter.getSelectors((state:AppState)=>state.productState);