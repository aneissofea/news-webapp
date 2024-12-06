import React, {useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import MyFavouritesPanel from './MyFavouritesPanel'
import DisplayResults from './DisplayResults';
import Header from './Header';

function Home({ setIsLoggedIn }) {
    const [newsList, setNewsList] = useState([]);   
    const [refreshFavourites, setRefreshFavourites] = useState(false);  
    const [keyword, setKeyword] = useState('');

    // Fetch news based on the keyword
    const handleSearchNews = (searchTerm) => {
        if (searchTerm) {
            // const apikey = process.env.newsAPI;
            const apikey = process.env.REACT_APP_NEWS_API;
            fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}`)
                .then(response => response.json())
                .then(data => {
                    const validArticles = data.articles.filter(article => 
                        article.title && article.description && article.url && article.urlToImage
                    );
                    setNewsList(validArticles); // Only set articles that have necessary fields
                })
                .catch(err => {
                    console.error('Error fetching news:', err);
                });
        }
    };

    // Effect to fetch news automatically on mount or keyword change
    useEffect(() => {
        // By default, fetch some news when the component mounts
        handleSearchNews('latest');
    }, []);
    
    const updatemyFavourites = () => {
        // Toggle refresh state to trigger a re-fetch in MyFavouritesPanel
        setRefreshFavourites(prev => !prev);
      };

    return (
        <Grid container className='main-container' direction={"column"} >
            <Grid className="header-container" item lg={1} style={{maxHeight: "10vh"}} >
                <Header 
                setSearchKeyword={setKeyword}
                handleSearchNews={handleSearchNews}
                setIsLoggedIn={setIsLoggedIn}
                />
            </Grid>

            <Grid className="content-container" item lg={11}>
                <Grid container direction='row' style={{height: "100%"}}>
                    <Grid className="left-panel-container" item lg="2.3" >
                        <MyFavouritesPanel style={{overflowY: "scroll", position: 'fixed', height: "100vh"}}>
                            refreshFavourites={refreshFavourites}
                        </MyFavouritesPanel>
                    </Grid>    
                    <Grid className='results-container' item lg="9.7">
                        <DisplayResults 
                        newsList={newsList}
                        updatemyFavourites={updatemyFavourites}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
};

export default Home;
