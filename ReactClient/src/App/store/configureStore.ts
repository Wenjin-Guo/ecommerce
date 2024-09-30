
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "../../features/contact/counterSlice";

export const store = configureStore({
    reducer:{
        counter: counterReducer,
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export default store;