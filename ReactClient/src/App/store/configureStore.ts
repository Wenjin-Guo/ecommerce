
import { configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { basketSlice } from "../../features/basket/basketSlice";
import { productSlice } from "../../features/catalog/productSlice";

export const store = configureStore({
    reducer:{
        counterState: counterSlice.reducer,
        basketState: basketSlice.reducer,
        productState: productSlice.reducer,
    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch']


export default store;