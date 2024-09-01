
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
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

interface Props{
    
    setViewMode:()=>void;
}

function Header({setViewMode}:Props){
    return(
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h5" component={NavLink} to='/' sx={{textDecoration:'none',color:'inherit'}}>
                    Ecommerce
                </Typography>
                <Switch onClick={setViewMode}></Switch>
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title,path})=>(
                        <ListItem key={title}>
                            <NavLink to={path} style={({ isActive, isTransitioning }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    color: "inherit",
                                    fontSize:"inherit",
                                    textDecoration: 'none',
                                    viewTransitionName: isTransitioning ? "slide" : "",
                                };
                            }}>
                                {title.toUpperCase()}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>

                <IconButton size="large" edge='start' color="inherit" sx={{mr:2}}>
                    <Badge badgeContent='4' color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>

                <List sx={{display:'flex'}}>
                    {rightLinks.map(({title,path})=>(
                        <ListItem key={title}>
                        <NavLink to={path} style={({ isActive, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: "inherit",
                                fontSize:"inherit",
                                textDecoration: 'none',
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                            {title.toUpperCase()}
                        </NavLink>
                    </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    )
}

export default Header;