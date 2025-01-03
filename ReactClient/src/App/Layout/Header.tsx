
import { ShoppingBag, TableRows } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, IconButton, List, ListItem,  Menu,  MenuItem,  Stack,  styled,  Switch, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import {  Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  AppDispatch, AppState } from "../store/configureStore";
import SignedInMenue from "./SignedInMenu";
import React from "react";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be',
          ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#c5ca42',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#2196f3',
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#aab4be',
      borderRadius: 20 / 2,
      ...theme.applyStyles('dark', {
        backgroundColor: '#8796A5',
      }),
    },
  }));



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
    theme:string;
    toggleTheme:()=>void;
}

function Header({theme, toggleTheme}:Props){
  const themeSetting = useTheme(); // Retrieve the theme object
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector((state:AppState)=>state.accountState);
  const basketState = useSelector((state:AppState)=>state.basketState);

  const numOfItems = Array.isArray(basketState.basket?.items)
    ? basketState.basket.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
    : 0;
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
          setAnchorEl(null);
      };
      
  const isSmallScreen = useMediaQuery(themeSetting.breakpoints.down("sm")); // Adjust based on your requirement (e.g., "sm" for small screens)
  return isSmallScreen?(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{mb:2}}>
        <Toolbar variant="dense" >
        <IconButton onClick={handleClick} size="small" edge='start' color="inherit" 
                  sx={{ 
                      mr: 1, 
                      '&:hover': { backgroundColor: 'primary.dark' },
                      '&.active':{color:'primary.dark'}, 
                      }}>
              <TableRows />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem component={NavLink} to='/catalog' onClick={handleClose}>Catalog</MenuItem>
            <MenuItem component={NavLink} to='/about' onClick={handleClose}>About</MenuItem>
            <MenuItem component={NavLink} to='/contact' onClick={handleClose}>Contact</MenuItem>
            <MenuItem component={NavLink} to='/login' onClick={handleClose}>Login</MenuItem>
            <MenuItem component={NavLink} to='/register' onClick={handleClose}>Register</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => {
                dispatch(signOut());
                dispatch(clearBasket());
                handleClose();
            } }>Logout</MenuItem>
        </Menu>
        <Stack alignItems="center" direction="row" sx={{flexGrow:1}}>
          <Typography variant="h5" component={NavLink} to='/' sx={navStyle}>
            Ecommerce
          </Typography>
          <FormControlLabel
            checked={theme === 'light' ? false : true}
            onClick={toggleTheme}
            control={<MaterialUISwitch sx={{ m: 1 ,transform:"scale(0.8)"}} />}
            label=""
          />
        </Stack>
        <IconButton component={Link} to='/basket' size="small" edge='start' color="inherit"
          sx={{
            mr: 0,
            '&:hover': { backgroundColor: 'primary.dark' },
            '&.active': { color: 'primary.dark' }
          }}>
          <Badge badgeContent={numOfItems} color="secondary" >
            <ShoppingBag />
          </Badge>
        </IconButton>
      </Toolbar>
      </AppBar>
    </Box>
    ):(
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{mb:4}}>
          <Toolbar >
              <Stack  alignItems={'center'} flexGrow={1} direction={'row'}>
                  <Typography variant="h5" component={NavLink} to='/' sx={navStyle}>
                      Ecommerce
                  </Typography>
                  

                  <FormControlLabel
                      checked={theme==='light'? false:true}
                      onClick={toggleTheme}
                      control={<MaterialUISwitch sx={{ m: 1 }} />}
                      label=""
                  />

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
              </Stack>    

                
              
              <Stack alignItems={'center'} direction={'row'}>
                  <IconButton component={Link} to='/basket' size="large" edge='start' color="inherit" 
                      sx={{ 
                          mr: 2, 
                          '&:hover': { backgroundColor: 'primary.dark' },
                          '&.active':{color:'primary.dark'} 
                          }}>
                      <Badge badgeContent={numOfItems} color="secondary" >
                          <ShoppingBag />
                      </Badge>
                  </IconButton>
                  {account.status==="succeeded"?(
                    <SignedInMenue />
                  ) :(
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
                  )}
              </Stack>        
              
          </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;