import React, {useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import MyFavouritesPanel from './MyFavouritesPanel'
import DisplayResults from './DisplayResults';
import Header from './Header';
import SidebarIcon from '../image/Sidebar_Icon.png';

function Home({ setIsLoggedIn }) {
    const [isFavouritesPanelOpen, setIsFavouritesPanelOpen] = useState(false);
    const [newsList, setNewsList] = useState([]);   
    const [refreshFavourites, setRefreshFavourites] = useState(false);  
    const [keyword, setKeyword] = useState('');

    // Fetch news based on the keyword
    const handleSearchNews = (searchTerm) => {
        if (searchTerm) {

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
    
    // Toggle MyFavouritesPanel visibility
    const toggleFavouritesPanel = (event) => {
        event.stopPropagation(); // Prevent the click from propagating to the document
        setIsFavouritesPanelOpen(!isFavouritesPanelOpen);
      };

    // Close the panel when clicking anywhere or scrolling
    const closeFavouritesPanel = () => {
        setIsFavouritesPanelOpen(false); // Close the panel
    };

    // Add event listeners to close the panel on click or scroll
    useEffect(() => {
        if (isFavouritesPanelOpen) {
        document.addEventListener('click', closeFavouritesPanel);
        // document.addEventListener('scroll', closeFavouritesPanel);
        }
        return () => {
        document.removeEventListener('click', closeFavouritesPanel);
        // document.removeEventListener('scroll', closeFavouritesPanel);
        };
    }, [isFavouritesPanelOpen]);
    
    const updatemyFavourites = () => {
        // Toggle refresh state to trigger a re-fetch in MyFavouritesPanel
        setRefreshFavourites(prev => !prev);
      };

    return (
        <Grid container className='main-container' direction={"column"} style={{backgroundColor: "#000", overflowX: "hidden"}} spacing={0} >
            {/* Header */}
            <Grid className="header-container" item lg={1} style={{maxHeight: "100%",  margin: 0, padding: 0}} >
                <Header 
                setSearchKeyword={setKeyword}
                handleSearchNews={handleSearchNews}
                setIsLoggedIn={setIsLoggedIn}
                />
            </Grid>
            {/* Content */}
            <Grid className="content-container" item lg={11} style={{ margin: 0, padding: 0 }}>
                <Grid container direction='row' style={{height: "100%", margin: 0, padding: 0, justifyContent: 'center'}} spacing={0}>
                    {/* Add the toggle button */}
                    {!isFavouritesPanelOpen && (
                        <img
                        src={SidebarIcon}
                        alt="Toggle Favourites"
                        onClick={toggleFavouritesPanel}
                        style={{
                            position: 'absolute',
                            top: '100px',
                            left: '45px',
                            zIndex: 1000,
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                        }}
                        />
                    )}

                    {/* MyFavouritesPanel */}
                    {isFavouritesPanelOpen && (
                    <Grid className="left-panel-container" item lg="2" spacing={0}>
                        <MyFavouritesPanel style={{overflowY: "scroll", position: 'fixed', height: "100%", margin: 0, padding: 0}}>
                            refreshFavourites={refreshFavourites}
                        </MyFavouritesPanel>
                    </Grid>
                    )}

                    {/* News articles */}    
                    <Grid className='results-container' item lg="10" >
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
