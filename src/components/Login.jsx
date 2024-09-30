import * as React from 'react';
import { Button, IconButton, Input, InputAdornment, TextField, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Login = ({setIsLoggedIn, setUsername}) => {

    const [localusername, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Add a state to store the error message
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
                backgroundColor: "#04DB9B",
                minHeight: "100vh",   // Makes background fill the whole page
                justifyContent: "center",  // Centers horizontally
                alignItems: "center"       // Centers vertically
            }}>
                <Grid container style={{
                borderRadius: '20px',
                padding: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '80%', 
                height:'600px', 
                maxWidth: '1000px', // Max width for larger screens
                display: "flex",
                backgroundColor: "#FFF",                
                justifyContent: "center",  // Centers horizontally
                alignItems: "center"       // Centers vertically
                }}>
                <Grid  item xs={12} sm={8} md={4}> {/* Adjust grid for responsiveness */}
                    <div 
                        className='header' 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '10vh',
                            marginBottom: '20px', //no use, delete later if you want to                                
                        }}>
                        <h1 style={{ fontFamily: 'Inter', fontSize: '3.4rem', color: '#333' }}> 
                            Brand News
                        </h1> 
                    </div>


                    <div className='inputs'>
                         {/* Conditionally render the alert if there's an error */}
                         {errorMessage && (
                                <Alert severity="warning" onClose={() => setErrorMessage(null)}>
                                    {errorMessage}
                                </Alert>
                            )}
                        <div className='input' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh'}}>
                            <TextField 
                            id="outlined-basic" 
                            label="username" 
                            variant="standard"
                            value={localusername} 
                            onChange={(e) => setLocalUsername(e.target.value)}
                            fullWidth  // Make input fill the available space
                            />                         
                        </div>
                        <div className='input' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', marginBottom: '20px'}}>
                            <Input
                                type={showPassword ? "text" : "password"} 
                                placeholder='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                fullWidth  // Make input fill the available space
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

                    <div className='login-container' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button variant="contained" onClick={handleLogin} sx={{ 
                        fontFamily: 'Inter', fontSize: '15px',
                        backgroundColor: '#04DB9B',  
                        color: '#fff',               
                        borderRadius: '8px',        
                        padding: '10px 20px',        
                        '&:hover': {
                            backgroundColor: '#006346', 
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