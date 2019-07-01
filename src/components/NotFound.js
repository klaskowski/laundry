import React from 'react'
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    emptyStateIcon: {
      fontSize: theme.spacing(12)
    },
  
    button: {
      marginTop: theme.spacing(1)
    },
  
    buttonIcon: {
      marginRight: theme.spacing(1)
    }
  });

export default withStyles(styles)( ({classes}) => {
    return (<React.Fragment>
        <Typography variant="h5" component="h3">
            Strona o podanym adresie nie istnieje
        </Typography>
        <Fab className={classes.button} color="secondary" component={Link} to="/" variant="extended">
            <HomeIcon className={classes.buttonIcon} /> Wróć do strony głównej
        </Fab>
      </React.Fragment>
    )
})
