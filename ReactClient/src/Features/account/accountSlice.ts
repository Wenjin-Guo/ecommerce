import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import axios from "axios";
import { router } from "../../app/router/Routes";

interface AccountState{
    user:User | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
}

const initialState: AccountState= {
    user:null,
    status: 'idle',
    error: null,
}

export const signInUser = createAsyncThunk<User,{email:string,password:string}>(
    'account/signInUser',
    async({email,password},thunkAPI)=>{
        try {
            const user = await axios(`http://localhost:5000/login?Email=${email}&Password=${password}`, {
                method:"post",
                withCredentials: true 
            });
            localStorage.setItem('user',JSON.stringify(user.data));
            return user.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data === "Your account is locked. Please try again later." ? "Your account is locked." : "Invalid credentials.";
                return thunkAPI.rejectWithValue(errorMessage);
              }
            return thunkAPI.rejectWithValue("An unexpected error occurred. Please try again.");
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async(_,thunkAPI)=>{
        try {
            // Get the token from localStorage
            const token = JSON.parse(localStorage.getItem('user')as string).token;
            console.log("Token from localstorage is: "+ token);
            // If token is not found, reject the request
            if (!token) {
                return thunkAPI.rejectWithValue('No token found, please login again.');
            }
            const user = await axios(`http://localhost:5000/currentUser`, {
                method:"get",
                headers: {
                    Authorization: `Bearer ${token}`, // Add Bearer token to the Authorization header
                  },
                withCredentials: true 
            });
            localStorage.setItem('user',JSON.stringify(user.data));
            return user.data;
        
        } catch (error) {
            const errorMessage = 'Failed to fetch current user';
            // Handle axios errors
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    return thunkAPI.rejectWithValue('Unauthorized. Please log in again.');
                } else {
                    return thunkAPI.rejectWithValue(errorMessage);
                }
            }
            // Handle non-Axios errors (e.g., network issues)
            return thunkAPI.rejectWithValue(errorMessage);
        }
    },
    {
        condition:()=>{
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        signOut:(state)=>{
            state.user =null;
            state.status='idle';
            localStorage.removeItem('user');
            router.navigate('/');
        }
    },
    extraReducers:(builder=>{
        builder.addMatcher(
            isAnyOf(signInUser.pending,fetchCurrentUser.pending),(state)=>{
                state.status = 'loading';
                state.error = null;
        })
        builder.addMatcher(
            isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state,action)=>{
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
        })
        builder.addMatcher(
            isAnyOf(signInUser.rejected,fetchCurrentUser.rejected),(state,action)=>{
                state.status = 'failed';
                state.error = action.payload as string;
                localStorage.removeItem('user');
                //console.log(action.payload)
            }
        )
    })
});

export const{signOut} = accountSlice.actions;
export default accountSlice.reducer;