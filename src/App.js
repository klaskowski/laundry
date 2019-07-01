import React from 'react';
import Menu from './components/Menu'
import Orders from './components/Orders'
import History from './components/History'
import Login from './components/Login'
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import './App.css';
import SignUp from './components/Signup';
import NotFound from './components/NotFound';
import { Provider } from "react-redux";
import store from './store';
import Firebase from './Firebase'

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
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
            <Menu></Menu>
            <Switch>
              <Route path="/" exact render={guardTo(<Orders/>)}/>
              <Route path="/orders/" exact render={guardTo(<Orders/>)} />
              <Route path="/login/" exact component={Login} />
              <Route path="/register/" exact component={SignUp} />
              <Route path="/history/" exact render={guardTo(<History/>)} />
              <Route component={NotFound}/>
            </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
