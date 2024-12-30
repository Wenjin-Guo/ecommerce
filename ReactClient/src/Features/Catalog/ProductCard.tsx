import {  Avatar, Box, Button, CardActions, CardContent, CardHeader, CardMedia,  styled,  Typography } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../app/store/configureStore";
import { addBasketItemsAsync } from "../basket/basketSlice";
import { useState } from "react";
import { Product } from "../../app/models/product";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
      
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

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
        <Card variant="outlined">
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <LoadingButton
                        loading={loading}
                        onClick={() => {
                            handleAddItem(item.id);
                            setTimeout(() => {
                                setLoading(false);
                            }, 500);
                        }}
                        variant="contained"
                        size="small"
                    >
                        Add to cart
                    </LoadingButton>
                    <Button
                        component={Link}
                        to={`/catalog/${item.id}`}
                        variant="contained"
                        size="small"
                    >
                        View
                    </Button>
                </Box>
            </CardActions>

        </Card>
    )
}