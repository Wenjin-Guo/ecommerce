
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "../../features/contact/counterSlice";
import basketReducer from "../../features/basket/basketSlice";

export const store = configureStore({
    reducer:{
        counterState: counterReducer,
        basketState: basketReducer,
    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  AppState,
  unknown,
  Action
>

export default store;