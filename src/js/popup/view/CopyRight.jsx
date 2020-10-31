import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
  copyright: {
    marginTop: theme.spacing(3)
  }
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography
      className={classes.copyright}
      variant="body2" color="textSecondary" align="center"
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        ZenzjTech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
