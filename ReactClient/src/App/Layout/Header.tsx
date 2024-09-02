
import { ShoppingBag } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem,  Switch, Toolbar, Typography } from "@mui/material";
import {  NavLink } from "react-router-dom";

const midLinks = [
    {id:1,title:"catalog", path:"/catalog"},
    {id:2,title:"about", path:"/about"},
    {id:3,title:"contact", path:"/contact"},
]

const rightLinks=[
    {title:"login", path:"/login"},
    {title:"register", path:"/register"},
]

const navStyle = {
    textDecoration:'none',
    color: 'inherit',
    '&.active': { fontWeight: 'bold',color:'info.dark' },
    '&:hover': { backgroundColor:'primary.dark'},
    
};

interface Props{
    
    setViewMode:()=>void;
}

function Header({setViewMode}:Props){
    return(
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display:'flex',alignItems:'center'}}>
                
                <Box display={"flex"} alignItems={'center'} flexGrow={1}>
                    <Typography variant="h5" component={NavLink} to='/' sx={navStyle}>
                        Ecommerce
                    </Typography>
                    <Switch onClick={setViewMode}></Switch>
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={title}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>    

                 
                
                <Box display={"flex"} alignItems={'center'}>
                    <IconButton size="large" edge='start' color="inherit" sx={{ mr: 2, '&:hover': { backgroundColor: 'primary.dark' } }}>
                        <Badge badgeContent='4' color="secondary" >
                            <ShoppingBag />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={title}
                                sx={navStyle}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>        
                
            </Toolbar>
        </AppBar>
    )
}

export default Header;