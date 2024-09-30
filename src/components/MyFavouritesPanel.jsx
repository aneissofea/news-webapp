import React, { useState, useEffect } from "react";
import { Grid, Button, List, ListItem, ListItemText, Typography} from "@mui/material";

function MyFavouritesPanel({refreshFavourites}) {

    const [favourites, setFavourites] = useState([]);

    // Fetch favorites from localStorage on component mount
    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(savedFavourites);
    }, [refreshFavourites]);        // Dependency on refreshFavourites ensures re-fetch

    // Handle clearing all favourites
    const handleClearFavourites = () => {
        localStorage.removeItem('favourites');
        setFavourites([]);
    };

    // Handle opening a news article in a new tab
    const openArticle = (url) => {
        window.open(url, '_blank');
    };

    return(
        <Grid container direction='row' style={{display: "flex", backgroundColor: "#fff", justifyContent : 'space-between', paddingLeft: '10px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)'}}>
          
                <h3 style={{ fontFamily: 'Inter', color: '#333',  }}>Favourites:</h3>
                <Button 
                variant="contained" 
                onClick={handleClearFavourites} 
                disabled={favourites.length === 0} 
                sx={{ 
                    fontFamily: 'Inter', 
                    backgroundColor: '#04DB9B',  
                    color: '#fff',               
                    borderRadius: '8px',        
                    padding: '0 10px',        
                    '&:hover': {
                        backgroundColor: '#006346', 
                    }
                }}>
                    Clear
                </Button>
        
            {favourites.length > 0 ? (
                <List>
                    {favourites.map((news, index) => (
                    <ListItem button key={index} onClick={() => openArticle(news.url)}>
                        <ListItemText primary={news.title} />
                    </ListItem>
                    ))}
                </List>
                ) : (
                <Typography variant="body2">No favourites yet.</Typography>
                )}
        </Grid>
        
    );
};

export default MyFavouritesPanel;