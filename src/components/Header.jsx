import * as React from 'react';
import { TextField, Grid, Button, Chip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Header({ setSearchKeyword, handleSearchNews, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleSetKeyword = () => {
        setSearchKeyword(keyword); // Update the keyword in parent state
        handleSearchNews(keyword); // Trigger the API call for search results
    };

    const handleLogOut = () => {
        // Clear login details from localStorage
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')

        // Update state and redirect to login
        setIsLoggedIn(false);
        navigate('/login', { replace: true });
    };

    return(
        <Grid container direction='row' style={{display: "flex", backgroundColor: "hsla(0, 100%, 100%, 0.9)", paddingLeft: '10px' }}>
            <Grid item xs={2.5} >
                <h3 style={{ fontFamily: 'Inter, Arial, Sans-serif', fontSize: '25px', color: '#333',  }}>Brand News</h3>    
            </Grid>
            <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField id="filled-basic"
                    label="Search for news"
                    variant="filled"
                    fullWidth={true}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSetKeyword(); // Trigger search when Enter is pressed
                        }
                    }}
                />
            </Grid>
            <Grid item xs={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                <Button variant="contained" onClick={handleSetKeyword} sx={{ 
                fontFamily: 'Inter, Arial, Sans-serif', 
                backgroundColor: '#8A848A',  
                color: '#fff',               
                borderRadius: '6px',        
                padding: '10px 20px',
                textTransform: 'none',
                fontWeight: 'bold',        
                '&:hover': {
                    backgroundColor: '#522350',
                    color: '#fff', 
                }
                }}>
                    Search
                </Button>
            </Grid>
            <Grid item xs={3} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Chip label={localStorage.getItem('username')} 
                sx={{
                    backgroundColor: 'transparent', 
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                />
            </Grid>

            <Grid item xs={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                variant="contained" 
                onClick={handleLogOut} sx={{ 
                fontFamily: 'Inter, Arial, Sans-serif', 
                backgroundColor: '#D5B5D4',  
                color: '#ffffff',
                fontWeight:'bold',               
                borderRadius: '25px',        
                padding: '10px 15px',
                textTransform: 'none',       
                '&:hover': {backgroundColor: '#522350', color: '#fff'}
                }}>
                    Logout
                </Button>
            </Grid>      
        </Grid>
    );
};

export default Header;