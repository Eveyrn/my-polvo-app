import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { BasketContext } from '../basket/BasketContext'; 
import './Header.css'; 

const Header: React.FC = () => {
  const navigate = useNavigate();
  const basketContext = useContext(BasketContext); 
  if (!basketContext) {
    return null; 
  }
  const { basket } = basketContext; 

  const handleHomeClick = () => {
    navigate('/'); 
  };

  return (
    <AppBar position="static">
      <Toolbar className="header">
        <IconButton edge="start" color="inherit" onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={handleHomeClick}
          className="header-logo"
        >
          My Polvo App
        </Typography>

        <Link to="/basket" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton color="inherit">
            <Badge badgeContent={basket.totalCount} color="error">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Link>

        <Link to="/add-dish" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ cursor: 'pointer', marginLeft: 2 }} className="header-links">
            Add dish
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
