import { useEffect} from "react"
import { Box, Button, Grid2, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, DeleteForever, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store/configureStore";
import { addBasketItemsAsync, deleteBasketItemsAsync, fetchBasketAsync } from "./basketSlice";

export function BasketPage(){

    const TAX_RATE = 0.13;

    function ccyFormat(num: number) {
        return `${num.toFixed(2)}`;
    }

    const dispatch = useDispatch<AppDispatch>();
    
    const basket = useSelector((state:AppState)=>state.basketState.basket);
    const status = useSelector((state:AppState)=>state.basketState.status);
    //const error = useSelector((state:AppState)=>state.basketState.error);

    
    useEffect(()=>{
        dispatch(fetchBasketAsync())
    },[dispatch]);
    
    //useEffect(() => {}, [basket]);
   

    const invoiceSubtotal = basket?.items.reduce((total,item)=>{
        return total +  item.price*item.quantity/100 ;
    },0)||0;
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const deliveryFee = invoiceSubtotal > 100 ? 0 : 5;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal + deliveryFee;

    if(status === 'loading') return <Typography>Loading....</Typography>
    if(!basket) return <Typography>Basket is empty</Typography>

   

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell >Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell component="th" scope="row">
                                <Box display="flex" alignItems="center">
                                    <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}></img>
                                    <span>{item.name}</span>
                                </Box>
                                
                            </TableCell>
                            <TableCell align="right">${ccyFormat(item.price/100)}</TableCell>
                            <TableCell align="right">
                                <IconButton color="error" onClick={()=>dispatch(addBasketItemsAsync({productId:item.productId,quantity:1}))}>
                                    <Add/>
                                </IconButton>  
                                {item.quantity}
                                <IconButton color="error" onClick={()=>dispatch(deleteBasketItemsAsync({productId:item.productId,quantity:1}))}>
                                    <Remove/>
                                </IconButton> 
                            </TableCell>
                            <TableCell align="right">${ccyFormat((item.price/100)*item.quantity)}</TableCell>
                            <TableCell align="center">
                                <IconButton color="error" onClick={()=>dispatch(deleteBasketItemsAsync({productId:item.productId,quantity:item.quantity}))}>
                                    <DeleteForever fontSize="small" />
                                </IconButton>   
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
        </TableContainer>
        <Grid2 container>
            <Grid2 size={6}></Grid2>
            <Grid2 size={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">${ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Delivery fee*</TableCell>
                                    <TableCell align="right">${ccyFormat(deliveryFee)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Tax</TableCell>
                                    <TableCell align="right">${ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">${ccyFormat(invoiceTotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        component={Link}
                        to={'/checkout'}
                        variant="contained"
                        size="large"
                        fullWidth>
                            Checkout
                    </Button>
            </Grid2>
        </Grid2>
        


        </>
        
    )
}