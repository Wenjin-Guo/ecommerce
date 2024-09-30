export interface CounterState{
    data:number
}

const initialState: CounterState={
    data:42
}

export default function CounterReducer(state = initialState, action: any){
    return state;
}