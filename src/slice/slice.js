import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const slice = createSlice({
    name: "Ecommerce",
    initialState: {
        details: [],
        singleDetails: [],
        cartTotal: 0,
        cartDetails: [],
        counter: 0,
        searchDetails: [],
        searchQuery: "",
        signupData: [],
        signIN:""
    },
    reducers: {
        getApiData(state, actions) {
            state.details = actions.payload
        },
        getSingleApi(state, actions) {
            state.singleDetails = actions.payload
        },
        // postApi(state,action){
        //     state.cartTotal+=1
        //     state.cartDetails.push(action.payload);
        // },
        // postApi(state, action) {
        //     const existingProduct = state.cartDetails.find(item => item.id === action.payload.id);

        //     if (existingProduct) {
        //         existingProduct.qty = (existingProduct.qty || 1) + 1;
        //     } else {
        //         state.cartDetails.push({ ...action.payload, qty: 1 });
        //     }

        //     state.cartTotal += 1; // still count overall cart items
        // },

        postAddtoCart(state, action) {
            debugger
            const productId = action.payload;
            console.log("ProductId", productId)
            const product = state.details.find(item => item.id === productId);
            console.log("product", product)

            if (product) {
                const existingProduct = state.cartDetails.find(item => item.id === productId);
                console.log("existingProduct", existingProduct)

                if (existingProduct) {
                    existingProduct.qty = (existingProduct.qty || 1) + 1;
                } else {
                    state.cartDetails.push({ ...product, qty: 1 });
                }

                state.cartTotal += 1;
            }
        },

        getCartData(state, actions) {
            state.cartDetails = actions.payload
        },

        incrementQty(state, action) {
            const productIncreId = action.payload;
            const productIncreIndex = state.cartDetails.findIndex((product) => product.id === productIncreId);
            console.log("productIncreIndex", productIncreIndex)

            if (productIncreIndex !== -1) {
                const product = state.cartDetails[productIncreIndex];

                if (product.qty > 0) {
                    product.qty += 1;
                } else {
                    state.cartDetails.splice(productIncreIndex, 1); // Remove product
                }

                state.cartTotal = Math.max(state.cartTotal + 1, 0);
            }
        },

        decrementQty(state, action) {
            console.log("Payload received:", action.payload); // Check the id
            const productId = action.payload;

            const productIndex = state.cartDetails.findIndex((product) => product.id === productId);
            // console.log("productIndex",productIndex)

            if (productIndex !== -1) {
                const product = state.cartDetails[productIndex];

                if (product.qty > 1) {
                    product.qty -= 1;
                } else {
                    state.cartDetails.splice(productIndex, 1); // Remove product
                }

                state.cartTotal = Math.max(state.cartTotal - 1, 0);
            }
        },
        removeproduct(state, action) {
            const productRemove = state.cartDetails.find((prod) => prod.id === action.payload)
            console.log("productRemovesssssssss", productRemove)

            if (productRemove) {
                const qtyToRemove = productRemove.qty;
                state.cartTotal = Math.max(state.cartTotal - qtyToRemove, 0);
            }
            state.cartDetails = state.cartDetails.filter((prod) => prod.id !== action.payload)
        },

        // getSearchItem(state,action){
        //     const searchWord=action.payload.toLowerCase();
        //     state.searchQuery=action.payload;
        //     state.searchDetails=state.details.filter(prod=>prod.title.toLowerCase().includes(searchWord))
        // },
        searchItem(state, action) {
            const searchWord = action.payload.toLowerCase();
            state.searchQuery = action.payload;
            state.searchDetails = state.details.filter(prod => prod.title.toLowerCase().includes(searchWord))
        },
        getSignupApi(state, action) {
            state.signupData = [action.payload]
            console.log("Signup data stored:", action.payload);
        },
        signInToken(state,action){
              const getToken=state.signIN=action.payload;
              console.log("Token is",getToken)
        },
        removeToken(state){
            state.signIN=""
        }


    }
})


export const rdAction = slice.actions


export const getApi = () => {
    return (dispatch) => {
        const getOutput = () => {
            axios.get("https://fakestoreapi.com/products").then((response) => {
                dispatch(rdAction.getApiData(response.data))
                console.log("Get all data", response.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getOutput()
    }
}


export const getSingleProduct = (id) => {
    return (dispatch) => {
        const getSingleOutput = () => {
            axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
                console.log(response.data)
                dispatch(rdAction.getSingleApi(response.data))
            }).catch((error) => {
                console.log(error)
            })
        }
        getSingleOutput()
    }
}


// export const postAddtoCart = (id) => {
//     return (dispatch, getState) => {
//         const product = getState().details.find(p => p.id === id);
//         console.log("Product is", product)
//         if (product) {
//             dispatch(rdAction.postApi(product));
//         }
//     };
// };


export const getcartallApi = () => {
    return (dispatch) => {
        const getCartOutput = () => {
            axios.get("https://fakestoreapi.com/carts").then((response) => {
                console.log(response)
                dispatch(rdAction.getCartData(response.data))
            }).catch((error) => {
                console.log(error)
            })
        }
        getCartOutput()
    }
}

// export const searchItem=(inputVal)=>{
//     return(dispatch)=>{
//         const outputSearch=()=>{
//             dispatch(rdAction.getSearchItem(inputVal))
//         }
//         outputSearch()
//     }
// }

export const postSignupLogin = (formData) => {
    return (dispatch) => {
        axios.post("https://fakestoreapi.com/users", {
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
            .then((response) => {
                console.log("Post is", response.data);
                dispatch(rdAction.getSignupApi(response.data));
            })
            .catch((error) => {
                console.error("Signup error:", error);
            });
    };
};


