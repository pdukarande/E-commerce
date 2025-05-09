import { Box, Button, Card, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { rdAction } from '../../slice/slice';

const Signin = () => {

    const[getUser, setUser]=useState("");
    const[getEmail, setEmail]=useState("")
    const[getPassword, setPassword]=useState("")
    const[getError,setError]=useState()

    const navigate = useNavigate();
    const dispatch=useDispatch()


    const handleSubmit=(e)=>{
        e.preventDefault(); 

        const signInForm={
            username:getUser,
            email:getEmail,
            password:getPassword
        }
        axios.post("https://fakestoreapi.com/auth/login",signInForm).then((response)=>{
            console.log("Post response",response.data)
            localStorage.setItem('token', response.data.token);
            dispatch(rdAction.signInToken(response.data.token))
            navigate("/home")


        }).catch((error)=>{ 
            console.log("Error Found",error)
            setError("Wrong Credentials")
        })
    }
  return (
    <Box sx={{backgroundImage:"radial-gradient(at 50% 50%, rgb(240, 247, 255), rgb(255, 255, 255))"}}>
      <Container maxWidth="sm" >
              <Card sx={{ mt: 8, p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    name="username"
                    onChange={(e)=>setUser(e.target.value)}
                    // value={formData.username}
                    // onChange={handleChange}
                    // error={!!errors.username}
                    // helperText={errors.username}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    // value={formData.email}
                    // onChange={handleChange}
                    // error={!!errors.email}
                    // helperText={errors.email}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    // value={formData.password}
                    // onChange={handleChange}
                    // error={!!errors.password}
                    // helperText={errors.password}
                  />
                  
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, backgroundColor:"#d26544" }}>
                    Sign In
                  </Button>
                  <Typography sx={{textAlign:"center",color:"red",mt:2}}>{getError}</Typography>
                </Box>
              </Card>
            </Container>
    </Box>
  )
}

export default Signin
