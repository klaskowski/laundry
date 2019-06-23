import React from 'react';
import Menu from './components/Menu'
import Orders from './components/Orders'
import Login from './components/Login'
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import './App.css';
import SignUp from './components/Signup';
import Firebase from './Firebase';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
  status: {
    danger: 'orange',
  },
});

const guardTo = Component => () => Firebase.auth().currentUser ? Component : <Login />

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <Menu></Menu>
          <Route path="/" exact render={guardTo(<Orders/>)}/>
          <Route path="/orders/" exact render={guardTo(<Orders/>)} />
          <Route path="/login/" exact component={Login} />
          <Route path="/register/" exact component={SignUp} />
          <Route path="/history/" exact render={guardTo(<Orders historyOfOrders={true}/>)} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
