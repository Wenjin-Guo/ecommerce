import { LoadingButton } from "@mui/lab";
import { CardActions, CardContent, CardHeader, CardMedia, styled, Typography } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { useState } from "react";
import { BasketItem } from "../../app/models/basket";

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
    item:BasketItem;
}

export default function CheckoutItem({item}:Props){
    const [loading, setLoading] = useState(false);
    
    //const dispatch = useDispatch<AppDispatch>();

    /* function handleAddItem(productId:number){
        setLoading(true);
        dispatch(addBasketItemsAsync({productId:productId,quantity:1}))
    } */

    return <Card >
        <CardHeader
            title={item.name}
            titleTypographyProps={{
                sx: { fontweight: 'bold', color: 'primary.main' }
            }}
        />
        <CardMedia
            sx={{ height: 140, backgroundSize: 'contain' }}
            image={item.pictureUrl}
            title={item.name}
        />
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                ${(item.price / 100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {item.brand} / {item.type}
            </Typography>
        </CardContent>
        <CardActions>
            
            <LoadingButton loading={loading}
                onClick={() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 500);
                }}
                variant="contained" size="small">+</LoadingButton> 
             number
            <LoadingButton loading={loading}
                onClick={() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 500);
                }}
                variant="contained" size="small">-</LoadingButton>
        </CardActions>
    </Card>
}