// import React from 'react'

// import { useSelector } from 'react-redux';

// const Viewsingleproduct = () => {
//     const receivedSingleData = useSelector((state) => state.singleDetails)


//     return (
//         <div>
//             {
//                 receivedSingleData.map((singleData)=>{
//                     console.log("Single data is",singleData)
//                 })
//             }
//         </div>
//     )
// }

// export default Viewsingleproduct


import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, rdAction } from '../../slice/slice';
import { Box, Button, Container, Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const Viewsingleproduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleProduct = useSelector((state) => state.singleDetails);

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);

    const addtocartItem = (id) => {
        dispatch(rdAction.postAddtoCart(id))
        console.log("Id of Product is", id)
    }

    return (
        <div>
            <Container maxWidth="lg">
                {singleProduct ? (
                    <Box sx={{ display: "flex", gap: "100px", marginTop: "50px" }}>
                        <Box>
                            <img src={singleProduct.image} alt={singleProduct.title} style={{ height: "450px" }} />
                        </Box>
                        <Box>
                            <h2>{singleProduct.title}</h2>
                            <p>{singleProduct.description}</p>
                            <p>Price: ${singleProduct.price}</p>
                            <Box>
                                <Rating name="read-only" style={{ padding: "0px 20px 20px 0px" }}  value={singleProduct.rating?.rate} readOnly />
                            </Box>

                            {/* <p>Rating: {singleProduct.rating?.rate}</p> */}
                            <Button variant="outlined" onClick={() => addtocartItem(singleProduct.id)} backgroundColor='green' startIcon={<AddShoppingCartIcon />}>
                                Add to Cart
                            </Button>

                        </Box>
                    </Box >
                ) : (
                    <p>Loading...</p>
                )}
            </Container>

        </div>
    );
};

export default Viewsingleproduct;

