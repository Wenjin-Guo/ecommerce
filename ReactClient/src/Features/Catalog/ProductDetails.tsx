import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store/configureStore";
import { addBasketItemsAsync } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";
import { fetchSingleProductAsync, selectProductById } from "./productSlice";

function ProductDetails(){
    const {id} = useParams<{id:string}>();
    const product = useSelector((state:AppState)=>selectProductById(state,Number(id)));
    const state = useSelector((state:AppState)=>state.productState.status);
    const dispatch = useDispatch<AppDispatch>();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        dispatch(fetchSingleProductAsync(Number(id)));
    },[id,dispatch]);


    function handleAddItem(productId:number){
        setLoading(true);
        dispatch(addBasketItemsAsync({productId:productId,quantity:1}))
    }
    if(state.includes("pending")) return "Loading....";
    if(!product) return <NotFound />

    return(
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                    
                <Grid>
                    <LoadingButton loading={loading}
                    onClick={()=>{
                        handleAddItem(product.id);
                        setTimeout(() => {
                            setLoading(false)
                        }, 500);
                    }} 
                    color="primary"
                    size="medium"
                    variant="contained"
                    fullWidth>
                        Add to Cart
                    </LoadingButton >
                </Grid>
                
            </Grid>
        </Grid>
    )
}

export default ProductDetails;