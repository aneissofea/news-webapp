import React, { useState, useEffect } from "react";
import { Grid, Button, List, ListItem, ListItemText, Typography} from "@mui/material";

function MyFavouritesPanel({refreshFavourites}) {

    const [favourites, setFavourites] = useState([]);

    // Fetch favorites from localStorage on component mount
    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(savedFavourites);
    }, [refreshFavourites]);  

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
        <Grid container direction='column' style={{display: "flex", backgroundColor: "#000", color: '#fff', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', paddingLeft: '12px'}}>
            <div style={{display: 'flex', flexDirection : "row", justifyContent : 'space-between', alignItems: 'center', }}>
                <div style={{ fontFamily: 'Inter, Arial, Sans-serif', fontSize:'18px', fontWeight: 'bold',}}>Favourites</div>
                <Button 
                variant="contained" 
                onClick={handleClearFavourites} 
                disabled={favourites.length === 0} 
                sx={{ 
                    fontFamily: 'Inter, Arial, Sans-serif', 
                    backgroundColor: '#8A848A !important',  
                    color: '#ffffff !important',               
                    borderRadius: '6px',        
                    padding: '5px 10px',
                    textTransform: 'none', 
                    fontWeight: 'bold',       
                    '&:hover': {
                        backgroundColor: '#333',
                    }
                }}>
                    Clear
                </Button>
            </div>

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