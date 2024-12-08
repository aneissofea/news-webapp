import React, {useState, useEffect} from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const NewsItem = ({ news, updatemyFavourites  }) => {

  const [isFavorited, setIsFavorited] = useState(false);

  // Check if the article is already in favourites on component mount
  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isAlreadyFavourite = savedFavourites.some(fav => fav.url === news.url);
    setIsFavorited(isAlreadyFavourite);
  }, [news.url]);

  const handleBookmark = (e) => {
    e.stopPropagation(); // Prevent triggering the card's click event
    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (isFavorited) {
      // Remove the article from favourites
      const updatedFavourites = savedFavourites.filter(fav => fav.url !== news.url);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      setIsFavorited(false);
      alert('Article removed from favourites.');
    } else {
      // Add the article to favourites
      savedFavourites.push(news);
      localStorage.setItem('favourites', JSON.stringify(savedFavourites));
      setIsFavorited(true);
      alert('Article saved to favourites!');
    }

    // Update the MyFavouritesPanel
    if (updatemyFavourites) updatemyFavourites();
  };

  const openArticle = () => {
    window.open(news.url, '_blank');
  };
 
  return (
    <Card style={{ margin: '10px', width: '235px', height:'350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',}} onClick={openArticle} onMouseEnter={(e) => (e.currentTarget.style.cursor = 'pointer')}>
      <div>
        {/* News Image */}
        <CardMedia
          component="img"
          height="140"
          image={news.urlToImage ? news.urlToImage : 'https://via.placeholder.com/245x140.png?text=No+Image'} // Fallback to placeholder image
          alt={news.title}
        />
        
        {/* News Content */}
        <CardContent  style={{marginBottom: '0px', paddingBottom:'0px'}}>
          <Typography fontFamily='Inter, Arial, Sans-serif' fontSize="17px" component="div">{news.title}</Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(news.publishedAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </div>

      {/* Action Buttons */}
      <div style={{marginBottom: '5px', marginLeft:'5px'}}>
        <IconButton 
        aria-label="add to favorites" 
        onClick={handleBookmark} 
        color={isFavorited ? 'error' : 'default'}>    
          <FavoriteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default NewsItem;