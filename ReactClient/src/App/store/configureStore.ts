import { createStore } from "redux";
import CounterReducer from "../../features/contact/CounterReducer";

export function ConfigureStore(){
    return createStore(CounterReducer);
}