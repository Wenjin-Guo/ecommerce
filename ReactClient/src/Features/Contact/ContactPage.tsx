
import { Button, ButtonGroup, Typography } from "@mui/material";
import {increment,decrement,incrementByAmount} from "./counterSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/configureStore";



function ContactPage(){
    const count = useSelector((state:RootState)=>state.counter.value);
    const dispatch = useDispatch();

    return(
        <>
            <Typography variant="h2">
                Contact Page
            </Typography>
            <Typography variant="h5">
                The data is : {count}
            </Typography>
            <ButtonGroup>
                <Button variant="contained" color="error" onClick={()=>dispatch(decrement())}>
                    Decrement
                </Button>
                <Button variant="contained" color="primary" onClick={()=>dispatch(increment())}>
                    Increment
                </Button>
                <Button variant="contained" color="error" onClick={()=>dispatch(incrementByAmount(5))}>
                    IncrementByAmount5
                </Button>
            </ButtonGroup>
        </>
        
    )
}

export default ContactPage;