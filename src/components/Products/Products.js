import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApi, getSingleProduct, rdAction } from '../../slice/slice'
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const Products = () => {

    const dispatch = useDispatch()
    // const productData = useSelector((state) => state.details)


    // const filterProducts = useSelector((state) => state.searchDetails.length > 0 ? state.searchDetails : state.details)
    // console.log("productsssssssssssssss", filterProducts)
    const { details, searchDetails, searchQuery } = useSelector((state) => state)
    const filterProducts =
        searchQuery !== ""
            ? searchDetails  // show filtered results or empty list
            : details;  // no search, show full list


    useEffect(() => {
        dispatch(getApi())
    }, [dispatch])

    const navigateSingleProduct = useNavigate()

    const viewProduct = (id) => {
        dispatch(getSingleProduct(id))
        navigateSingleProduct(`/Viewsingleproduct/${id}`)
    }

    // const addtocartItem = (id) => {
    //     dispatch(postAddtoCart(id))
    //     console.log("Id of Product is", id)
    // }
    const addtocartItem = (id) => {
        dispatch(rdAction.postAddtoCart(id))
        console.log("Id of Product is", id)
    }


    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Product List</h2>


            <Grid container spacing={2} sx={{
                justifyContent: "center"
            }}>
                {
                    filterProducts.length > 0 ?
                        filterProducts.map((prod) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={3} key={prod.id}>
                                        <Card key={prod.id} sx={{
                                            maxWidth: 345, padding: "10px 0px"
                                        }} >


                                            <CardMedia
                                                component="img"
                                                image={prod.image}
                                                alt={prod.title}
                                                onClick={() => viewProduct(prod.id)}
                                                sx={{
                                                    objectFit: "contain",
                                                    height: "30vh",
                                                    transition: "transform 0.3s ease-in-out",
                                                    "&:hover": {
                                                        transform: "scale(1.1)",
                                                        // backgroundColor: "#d26544"
                                                    },
                                                }}
                                            />


                                            <CardContent onClick={() => viewProduct(prod.id)}>
                                                <Typography gutterBottom variant="h6" component="div" sx={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}>
                                                    {prod.title}
                                                </Typography>
                                                <Typography variant='p' sx={{ color: 'text.primary' }}>{prod.category}</Typography>
                                                <Typography variant="body2" sx={{
                                                    color: 'text.secondary', display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}>
                                                    {prod.description}
                                                </Typography>
                                            </CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: "space-between", padding: '10px 16px;' }}>
                                                <Box>
                                                    <Typography variant="p">${prod.price}</Typography>
                                                </Box>

                                                <Box>
                                                    <Rating name="read-only" style={{ paddingRight: "20px" }} value={prod.rating.rate} readOnly />
                                                    {/* <Typography variant="p" >{prod.rating.rate}</Typography> */}
                                                    {/* <Typography variant="p">{prod.rating.count}</Typography> */}
                                                </Box>
                                            </Box>
                                            <Box sx={{ textAlign: "center" }}>
                                                <Button variant="outlined" onClick={() => addtocartItem(prod.id)} backgroundColor='green' startIcon={<AddShoppingCartIcon />}>
                                                    Add to Cart
                                                </Button>
                                            </Box>
                                            {/* <VisibilityIcon onClick={() => viewProduct(prod.id)} /> */}

                                        </Card>
                                    </Grid>
                                </>
                            )
                        })
                        :
                        <Typography variant="h6" sx={{ textAlign: "center", width: '100%', mt: 4 }}>
                            No products found.
                        </Typography>

                }
            </Grid>


        </div>
    )
}

export default Products
