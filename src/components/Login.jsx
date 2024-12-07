import * as React from 'react';
import { Button, IconButton, Input, InputAdornment, TextField, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../image/Login.jpg';


const Login = ({setIsLoggedIn, setUsername}) => {

    const [localusername, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); 
    const navigate = useNavigate();
;
    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };

    const mouseDownPasswordHandler = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        console.log(localusername, password);
        
        if (localusername === 'sofea' && password === 'chrome123') {
            
            console.log("success!");
            localStorage.setItem('isLoggedIn', true);   // Set login status in local storage
            localStorage.setItem('username', localusername);
            setIsLoggedIn(true);
            setLocalUsername(localusername);
            navigate('/home');
            setErrorMessage(null); // Clear the error message if login is successful
        } else {
            setErrorMessage('Wrong username and password'); // Set the error message
        }
    };

    return(
        <div className='container'>
            <Grid container  style={{
                display: "flex",
                zIndex: '-1',
                backgroundColor: "#000",
                minHeight: "100vh",   
                justifyContent: "center",  
                alignItems: "center"       
            }}>
                <Grid container style={{
                borderRadius: '20px',
                padding: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '80%', 
                height:'600px', 
                maxWidth: '1000px', 
                display: "flex",
                backgroundColor: "#FFF",                
                justifyContent: "center",  
                alignItems: "center"      
                }}>

                    {/* Left Section */}
                    <Grid
                    item
                    xs={0}
                    sm={6}
                    style={{
                        backgroundImage: `url(${LoginImage})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%',
                        borderRadius: '30px',
                    }}>
                    </Grid> 

                    {/* Right Section */}
                    <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                    >
                        <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '2.4rem', color: '#333', margin: '0px' }}>
                            Welcome Back!
                        </h1>
                        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1rem', color: '#666', marginBottom: '45px' }}>
                            Please enter your details
                        </p>

                        <div className='inputs'>
                            {/* Conditionally render the alert if there's an error */}
                            {errorMessage && (
                                    <Alert severity="warning" onClose={() => setErrorMessage(null)}>
                                        {errorMessage}
                                    </Alert>
                                )
                            }
                            <div className='input' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh'}}>
                                <TextField 
                                id="outlined" 
                                label="Username" 
                                variant="standard"
                                value={localusername} 
                                onChange={(e) => setLocalUsername(e.target.value)}
                                fullWidth  // Make input fill the available space
                                />                         
                            </div>
                            <div className='input' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', marginBottom: '20px'}}>
                                <Input
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    fullWidth
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={showPasswordHandler}
                                                onMouseDown={mouseDownPasswordHandler} >
                                                {showPassword ? (<Visibility />) : (<VisibilityOff />)}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />                            
                            </div>
                        </div>

                        <div className='login-container' style={{display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: '35px' }}>
                            <Button variant="contained" onClick={handleLogin} sx={{ 
                            fontFamily: 'Inter, Arial, Sans-serif', fontSize: '15px',
                            fontWeight:'bold',
                            backgroundColor: '#D5B5D4',  
                            color: '#fff',               
                            borderRadius: '25px',        
                            padding: '10px 20px',
                            textTransform: 'none', // Prevents text from being capitalized        
                            '&:hover': {
                                backgroundColor: '#522350', 
                            }
                            }}>
                                Log in
                            </Button>
                        </div>
                    </Grid>
                </Grid>              
            </Grid>
        </div>
    );
};
export default Login;