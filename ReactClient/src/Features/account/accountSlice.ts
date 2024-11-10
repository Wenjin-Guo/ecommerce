import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import axios from "axios";

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
    'account/currentUser',
    async(_,thunkAPI)=>{
        try {
            const user = await axios(`http://localhost:5000/currentUser`, {
                method:"post",
                withCredentials: true 
            });
            localStorage.setItem('user',JSON.stringify(user));
            return user.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (error:any) {
            const errorMessage = 'Failed to fetch current user';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{},
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
                //console.log(action.payload)
            }
        )
    })
});

export default accountSlice.reducer;