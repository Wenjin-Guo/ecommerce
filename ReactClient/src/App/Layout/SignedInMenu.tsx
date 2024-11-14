import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

export default function SignedInMenue(){
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textTransform: 'none', // To avoid automatic capitalization
                    fontFamily: 'inherit', // Inherit font family from parent (header component)
                    fontSize: '0.8rem', // Smaller font size
                    color: 'inherit', // Inherit color from parent (header component)
                    '&.active': { fontWeight: 'bold',color:'info.dark' },
                    '&:hover': { backgroundColor:'primary.dark'},
                }}
            >
                <Typography
                    variant="body1"
                    component="span"
                    align="left"
                    width="100%"
                    sx={{ textTransform: 'capitalize',fontSize: 'inherit', }} // Capitalize first letter
                >
                    Hello, 
                </Typography>
                <Typography
                    variant="body1"
                    component="span"
                    width="100%"
                    textAlign="center"
                    sx={{ textTransform: 'capitalize', fontSize: 'inherit', }} // Capitalize first letter
                >
                    Account & Profile
                </Typography>
            </Button>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={()=>{
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>Logout</MenuItem>
            </Menu>
        </>
    );
}