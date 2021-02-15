import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import withStyles from "@material-ui/core/styles/withStyles";


const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

export default function HoverRating() {
  const handleClick = async () => {
    try {
      await chrome.tabs.create({
        url: 'https://chrome.google.com/webstore/detail/' + chrome.runtime.id + '?utm_campaign=rating'
      })
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Box
      component="fieldset" mb={3} borderColor="transparent"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <StyledRating
        name="customized-color"
        defaultValue={5}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        icon={<FavoriteIcon fontSize="inherit" />}
        onClick={handleClick}
      />
      <Typography variant="caption">Rate us now! Thank you</Typography>
    </Box>
  );
}
