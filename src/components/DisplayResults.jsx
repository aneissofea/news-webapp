import React from 'react';
import { Grid } from "@mui/material";
import NewsItem from './NewsItem';

const DisplayResults = ({ newsList }) => {
    return(
        <Grid container direction='row' style={{display: "flex",backgroundColor: "#3FCF8F3", paddingLeft: '10px'}}>
            
            <Grid container spacing={1}>
                {newsList.map((newsItem) => (
                    <Grid item xs={12} sm={6} md={3} key={newsItem.url}>
                        <NewsItem news={newsItem} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default DisplayResults;