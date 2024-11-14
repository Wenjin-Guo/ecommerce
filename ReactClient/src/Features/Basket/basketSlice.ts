import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import axios from "axios";
import { getCookie } from "../../app/util/util";

interface BasketState{
    basket:Basket|null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
};

const initialState: BasketState = {
    basket:null,
    status: 'idle',
    error: null,
};



export const fetchBasketAsync = createAsyncThunk<Basket>(
  'basket/fetchBasket',
  async (_,thunkAPI) => {
    try {
      const response = await axios('http://localhost:5000/api/Basket', {
        method: "get",
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      const errorMessage = 'Failed to fetch the basket';
      // Handle axios errors
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(errorMessage);
      }
      // Handle non-Axios errors (e.g., network issues)
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
  {
    
    condition:()=>{
      if(!getCookie('buyerId')) return false;
    }
  }
);

export const addBasketItemsAsync = createAsyncThunk<Basket,{productId:number,quantity:number}>(
    'basket/addBasketItemsAsync',
    async({productId,quantity}, thunkAPI)=>{
      try {
        const response = await axios(`http://localhost:5000/api/Basket?productId=${productId}&quantity=${quantity}`,{ 
          method:"post",
          withCredentials: true 
        });
        return response.data;
      } catch (error) {
        const errorMessage = 'Failed to add the item';
        // Handle axios errors
        if (axios.isAxiosError(error) && error.response) {
          return thunkAPI.rejectWithValue(errorMessage);
        }
        // Handle non-Axios errors (e.g., network issues)
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const deleteBasketItemsAsync = createAsyncThunk<void,{productId:number,quantity:number}>(
    'basket/deleteBasketItemsAsync', 
    async({productId, quantity},thunkAPI)=>{
      try {
        const response = await axios(`http://localhost:5000/api/Basket?productId=${productId}&quantity=${quantity}`,{ 
          method:"delete",
          withCredentials: true 
        });
        return response.data;
      } catch (error) {
        const errorMessage = 'Failed to delete the item';
        // Handle axios errors
        if (axios.isAxiosError(error) && error.response) {
          return thunkAPI.rejectWithValue(errorMessage);
        }
        // Handle non-Axios errors (e.g., network issues)
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
)

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        setBasket:(state,action)=>{
            state.basket = action.payload;
        },
        removeItem:(state,action)=>{
            const {productId,quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i=>i.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
        },
        clearBasket:(state)=>{
          state.basket=null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchBasketAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.basket = action.payload;
          })
          .addCase(addBasketItemsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(addBasketItemsAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.basket = action.payload;
          })
          .addCase(addBasketItemsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message as string;
          })
          .addCase(deleteBasketItemsAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteBasketItemsAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const {productId, quantity} = action.meta.arg;
            const productIndex = state.basket?.items.findIndex(i=>i.productId === productId);
            if(productIndex === -1 || productIndex === undefined) return;
            state.basket!.items[productIndex].quantity -= quantity;
            if(state.basket?.items[productIndex].quantity === 0){
                state.basket.items.splice(productIndex,1)
            }
          })
          .addCase(deleteBasketItemsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch basket';
          });
      }
});

export const{setBasket,removeItem,clearBasket} = basketSlice.actions;
export default basketSlice.reducer;