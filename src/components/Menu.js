import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase';
import Collapse from '@material-ui/core/Collapse';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  signUpButton: {
    marginRight: theme.spacing(1)
  },
  logoButton: {
    height: "50px",
    "margin-left": "20px"
  },
  spacer: {
    "padding-bottom": "64px"
  }
}));

export default withRouter(({history}) => {

  const classes = useStyles();
  const [logoMenu, setLogoMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleLogoClick(){
    setLogoMenu(!menuOpen)
  }

  const menuOpen = Boolean(logoMenu);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Pralnia
          </Typography>
          <Collapse in={menuOpen}>
          { !firebase.auth().currentUser &&
            <React.Fragment>
            <Button className={classes.signUpButton} color="secondary" variant="contained" onClick={() => { history.push("/register/") }}>Zarejestruj się</Button>
            <Button color="secondary" variant="contained" onClick={() => { history.push("/login/") }}>Zaloguj się</Button>
            </React.Fragment>
          }
          { firebase.auth().currentUser &&
            <React.Fragment>
            <Typography>Zalogowany jako {firebase.auth().currentUser.email} </Typography>
            <Button color="secondary" variant="contained" onClick={() => { firebase.auth().signOut().then(() => history.push("/")) }}>Wyloguj się</Button>
            </React.Fragment>
          }
          </Collapse>
          <Button className={classes.logoButton} variant="contained" onClick={handleLogoClick}><img alt="logo" src={require('./logo.png')} style={{height: "40px"}}/></Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{
            label: 'Zamówienia',
            path: '/orders/'
          },{
            label: 'Kierowcy',
            path: '/'
          },{
            label: 'Historia zamówień',
            path: '/history/'
          },{
            label: 'Personel',
            path: '/'
          },{
            label: 'Statystyki',
            path: '/'
          }].map((el) => (
            <ListItem button key={el.label}>
              <ListItemText primary={el.label} onClick={() => { history.push(el.path); handleDrawerClose() }}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Divider className={classes.spacer}/>
    </div>
  )
})
