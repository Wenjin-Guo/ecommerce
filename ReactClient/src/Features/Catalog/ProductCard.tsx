import {  Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia,  Typography } from "@mui/material";
import { Product } from "../../App/Models/Product";
import { Link } from "react-router-dom";

interface Props{
    item:Product;
}

export default function ProductCard({item}:Props){
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
                <Button variant="contained" size="small">Add to cart</Button>
                <Button component={Link} to={`/catalog/${item.id}`} variant="contained" size="small">View</Button>
            </CardActions>
        </Card>
    )
}