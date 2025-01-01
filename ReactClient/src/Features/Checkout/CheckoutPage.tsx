import { Box, Button, CardContent,  Divider,  Grid, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { useSelector } from "react-redux";
import { AppState } from "../../app/store/configureStore";
import CheckoutItem from "./CheckoutItem";
import OrderSummaryCard from "./OrderSummaryCard";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
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

export default function CheckoutPage(){
    //set default is not logged in
    let isLoggedIn = false;

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small
    
    
    const basket = useSelector((state:AppState)=>state.basketState.basket);

    const result = useSelector((state:AppState)=> state.accountState.status);
    if(result=="succeeded"){
        isLoggedIn = true;
    }

    //page one as user logged in view
    const PageOne = () => (
        
        <Grid
            container
            sx={{
                width: "100%",
                maxWidth: "lg", // Use "lg" for Container width consistency
                margin: "0 auto", // Center the grid layout
            }}
        >
            <Grid xs={12} sm={9} order={{ xs: 2, sm: 1 }}>
                <Card
                    sx={{
                        display: "flex",
                        fontWeight: "bold",
                        position: 'relative',
                        marginBottom: 2, 
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography gutterBottom variant="h6" component="div">
                                Delivering to Simon XXX
                            </Typography>
                            <Button variant="outlined" color="primary" size="small">
                                Change
                            </Button>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        display: "flex",
                        fontWeight: "bold",
                        position: 'relative',
                        marginBottom: 2, 
                    }}
                >
                    <CardContent >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography gutterBottom variant="h6" component="div">
                                Paying with MasterCard 0880
                            </Typography>
                            <Button variant="outlined" color="primary" size="small">
                                Change
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        display: "flex",
                        fontWeight: "bold",
                        marginBottom: 2, 
                        padding:0
                    }}
                >
                    {basket?.items.map(item=>
                                (
                                    
                                    <CheckoutItem item={item} />
                                    
                                ))}
                </Card>
            </Grid>
            
            <Grid xs={12} sm={3} order={{ xs: 1, sm: 2 }}>
                <Card
                    sx={{
                        display: "flex",
                        marginLeft: isSmallScreen ? 0 : 2, // Conditional margin
                        marginRight: isSmallScreen ? 2 : 0, // Conditional margin
                        marginBottom:2,
                        maxWidth: isSmallScreen ? "100%" : "none", // Ensure proper width in smaller screens
                    }}
                >
                    <CardContent>
                        <Box sx={{
                            marginBottom: 1, display: "flex", flexGrow: 1, justifyContent: "center", // Centers horizontally
                            alignItems: "center",
                        }}>
                            <Button variant="contained" color="ochre">Place your order</Button>
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: "0.6rem", marginBottom: 2 }}>By placing your order, you agree to XXX's privacy notice and conditions of use.</Typography>
                        <Divider />
                        <OrderSummaryCard />
                    </CardContent>
                    
                   
                </Card>
                
            </Grid>
            
        </Grid>
    )


    const PageTwo = () => <Typography variant="h3">Only logged in users could use checkout!</Typography>;
    
    
    return (
        <div>
            {isLoggedIn ? <PageOne /> : <PageTwo />}
        </div>
    )
}