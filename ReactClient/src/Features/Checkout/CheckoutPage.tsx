import { Button, Card, CardContent,  Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store/configureStore";

export default function CheckoutPage(){
    //set default is not logged in
    let isLoggedIn = false;

    //check user if logged in
    
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
            <Grid xs={12} sm={9}>
                <Card
                    sx={{
                        height: "100px",
                        display: "flex",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        position: 'relative',
                        marginBottom: 2, 
                    }}
                >
                    <CardContent >
                        <Typography gutterBottom variant="h6" component="div">
                            Delivering to Simon XXX
                        </Typography>
                        <Button color="primary" size="small"  sx={{position:"absolute", top:13, right:8}}>
                            Change
                        </Button>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        height: "80px",
                        display: "flex",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        position: 'relative',
                        marginBottom: 2, 
                    }}
                >
                    <CardContent >
                        <Typography gutterBottom variant="h6" component="div">
                            Paying with MasterCard 0880
                        </Typography>
                        <Button color="primary" size="small"  sx={{position:"absolute", top:13, right:8}}>
                            Change
                        </Button>
                        
                    </CardContent>
                </Card>
                <Card
                    sx={{
                        display: "flex",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginBottom: 2, 
                    }}
                >
                    3
                </Card>
            </Grid>
            
            <Grid xs={12} sm={3}>
                <Card
                    sx={{
                        height: "33.33vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginLeft: 2, 
                    }}
                >
                    4
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