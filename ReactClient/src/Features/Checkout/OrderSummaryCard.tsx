import { Typography, Box, Grid } from "@mui/material";
import { AppState } from "../../app/store/configureStore";
import { useSelector } from "react-redux";



const OrderSummaryCard = () => {
  const TAX_RATE = 0.13;
  const basket = useSelector((state:AppState)=>state.basketState.basket);

  
 /*  useEffect(()=>{
      dispatch(fetchBasketAsync())
  },[dispatch]); */
  
  //useEffect(() => {}, [basket]);
 
  const totalItems = basket?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const invoiceSubtotal = basket?.items.reduce((total,item)=>{
      return total +  item.price*item.quantity/100 ;
  },0)||0;
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const deliveryFee = invoiceSubtotal > 100 ? 0 : 5;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal + deliveryFee;

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  return (
    
        <Box sx={{marginTop:2}}>
            <Grid
              container
              spacing={2}
              sx={{
                marginBottom:  0,
              }}
            >
              {/* Label Column  */}
              <Grid item xs={8}>
                <Typography
                  variant="body2"
                  marginBottom={1}
                  sx={{ fontSize: "0.7rem" }}
                >
                  Items ({totalItems})
                </Typography>
                <Typography
                  variant="body2"
                  marginBottom={1}
                  sx={{ fontSize: "0.7rem" }}
                >
                  Shipping & Handling:
                </Typography>
                <Typography
                  variant="body2"
                  marginBottom={1}
                  sx={{ fontSize: "0.7rem" }}
                >
                  Estimated GST/HST:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem", fontWeight:"bold" }}
                >
                  Order Total: 
                </Typography>
              </Grid>
              
              {/* Value Column */}
              <Grid item xs={4} textAlign="right">
                <Typography
                  variant="body2"
                  marginBottom={1}
                  sx={{ fontSize: "0.7rem" , textAlign:"right",display: "block"}}
                >
                  ${ccyFormat(invoiceSubtotal)}
                </Typography>
                <Typography
                  variant="body2"
                  marginBottom={1}
                  sx={{ fontSize: "0.7rem" , textAlign:"right",display: "block"}}
                >
                  ${ccyFormat(deliveryFee)}
                </Typography>
                <Typography
                  variant="body2"
                  marginBottom={1}
                  sx={{ fontSize: "0.7rem" , textAlign:"right",display: "block"}}
                >
                  ${ccyFormat(invoiceTaxes)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem", fontWeight:"bold", textAlign:"right",display: "block"}}
                >
                  ${ccyFormat(invoiceTotal)}
                </Typography>
              </Grid>
              
            </Grid>
          
        </Box>
  );
};

export default OrderSummaryCard;
