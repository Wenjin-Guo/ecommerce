import {  Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia,  Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../app/store/configureStore";
import { addBasketItemsAsync } from "../basket/basketSlice";
import { useState } from "react";
import { Product } from "../../app/models/product";


interface Props{
    item:Product;
}

export default function ProductCard({item}:Props){
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch<AppDispatch>();

    function handleAddItem(productId:number){
        setLoading(true);
        dispatch(addBasketItemsAsync({productId:productId,quantity:1}))
    }

    return(
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {item.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title = {item.name}
                titleTypographyProps={{
                    sx:{fontweight:'bold', color:'primary.main'}
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize:'contain' }}
                image= {item.pictureUrl}
                title= {item.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    ${(item.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.brand} / {item.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading}
                 onClick={()=>{
                    handleAddItem(item.id);
                    setTimeout(() => {
                        setLoading(false)
                    }, 500);
                }} 
                 variant="contained" size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${item.id}`} variant="contained" size="small" >View</Button>
            </CardActions>
        </Card>
    )
}