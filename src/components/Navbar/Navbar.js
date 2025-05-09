import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import styles from "./Navbar.module.css"
import { Avatar, Badge, IconButton, InputBase, ListItemAvatar, Paper, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import { rdAction } from '../../slice/slice';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';

function ScrollTop(props) {

    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 50,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element,

    window: PropTypes.func,
};


export default function Navbar(props) {
    const [state, setState] = React.useState({
        right: false,
    });

    const navigate = useNavigate()
    const homeNav = () => {
        navigate("/")
    }


    const dispatch = useDispatch()

    const searchText = (e) => {
        const textVal = e.target.value;
        dispatch(rdAction.searchItem(textVal))
    }

    const logout = () => {
        const fetchToken = localStorage.removeItem("token")
        console.log("fetchToken", fetchToken)
        dispatch(rdAction.removeToken())
        navigate("/")
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ m: 2 }}>Cart Items</Typography>
                <Button onClick={toggleDrawer(anchor, false)}> <CloseIcon /></Button>
            </Box>
            <Divider />
            <List>
                {
                    cartData && cartData.length > 0 ? cartData.map((item) => (
                        <>
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={item.title}
                                        src={item.image}
                                        variant="square" sx={{ objectFit: "contain" }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        <>
                                            <span>{`Price: $${item.price} | Qty: ${item.qty || 1}`}</span>
                                            <IconButton onClick={() => addCount(item.id)}><AddCircleIcon sx={{ color: "green" }} /> </IconButton>
                                            <IconButton onClick={() => removeCount(item.id)}><RemoveCircleIcon sx={{ color: "red" }} /> </IconButton>

                                        </>
                                    }
                                />
                                <IconButton onClick={() => removeProduct(item.id)}><DeleteForeverIcon sx={{ color: "black" }} /> </IconButton>

                            </ListItem>

                        </>

                    )) :
                        <img src="/images/illustrations/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt='empty cart'></img>
                }
                <Divider />
                {
                    cartData && cartData.length > 0 ?
                        <>
                            <Box sx={{ display: 'flex', alignItems: "center" }}>
                                <Typography variant="h6" sx={{ m: 2 }}>Sub Total</Typography>
                                <Typography variant='p' sx={{ m: 2 }}>${subTotal}</Typography>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Button variant="contained" sx={{ m: 2, backgroundColor: "green" }} endIcon={<SendIcon />}>
                                    Checkout
                                </Button>
                            </Box>
                        </>
                        : ""
                }





            </List>

        </Box>
    );


    const cartData = useSelector((state) =>
        state.cartDetails
    )
    console.log("carData is", cartData)
    const subTotal = cartData.reduce((total, item) => {
        return total + item.price * (item.qty || 1);
    }, 0).toFixed(2)





    const addCount = (id) => {
        dispatch(rdAction.incrementQty(id))
    }
    const removeCount = (id) => {
        dispatch(rdAction.decrementQty(id))
    }

    const removeProduct = (id) => {
        dispatch(rdAction.removeproduct(id))
    }

    const cartCount = useSelector((state) => state.cartTotal)
    console.log("CartCount is", cartCount)
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={styles.mainheader}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >

                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Products" onChange={searchText}
                            inputProps={{ 'aria-label': 'search Products' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                    {/* <Box
                        component="img"
                        src="/images/illustrations/Love Minimal Online Shopping Free Logo.png"
                        alt="Sample"
                        sx={{
                            width: 100,
                            height: 'auto',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    /> */}

                    <ShoppingBasketIcon onClick={homeNav} sx={{ width: '50px', height: '50px' }} />




                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            {['right'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button onClick={toggleDrawer('right', true)}>
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={cartCount} color="success">
                                                <Tooltip title="cart">
                                                    <ShoppingBagIcon />
                                                </Tooltip>

                                            </Badge>
                                        </IconButton>
                                    </Button>

                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        onOpen={toggleDrawer(anchor, true)}
                                    >
                                        {list(anchor)}
                                    </SwipeableDrawer>

                                </React.Fragment>
                            ))}
                        </Box>
                        <Tooltip title="Logout">
                            <IconButton >
                                <LogoutIcon onClick={logout} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
