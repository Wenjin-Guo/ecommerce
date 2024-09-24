import {  Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia,  Typography } from "@mui/material";
import { Product } from "../../App/Models/Product";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { Basket } from "../../App/Models/Basket";

interface Props{
    item:Product;
}

export default function ProductCard({item}:Props){
    const [loading, setLoading] = useState(false);
    const [basket, setBasket] = useState<Basket|null>(null);
    
    const fetchBasket = async()=>{
        try {
            const response = await axios('http://localhost:5000/api/Basket',{
                method:"get",
                withCredentials: true
            });
            setBasket(response.data)
        } catch (error) {
            console.error('Error fetching Basket',error)
        }
        
    }

    useEffect(()=>{
        fetchBasket();
    },[basket])

    function handleAddItem(productId:number){
        setLoading(true);
        axios(`http://localhost:5000/api/Basket?productId=${productId}&quantity=1`,{ 
            method:"post",
            withCredentials: true 
        })
        .catch(error=>console.log(error))
        
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
                    }, 1000);
                }} 
                 variant="contained" size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${item.id}`} variant="contained" size="small" >View</Button>
            </CardActions>
        </Card>
    )
}