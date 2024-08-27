import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props{
    setViewMode:()=>void;
}

function Header({setViewMode}:Props){
    return(
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h5">
                    Ecommerce
                </Typography>
                <Switch onClick={setViewMode}></Switch>
            </Toolbar>
        </AppBar>
    )
}

export default Header;