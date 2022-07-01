import logo from './logo.svg';
import './App.css';
import ListProduct from './conpoment/ListProduct';
import Store from './conpoment/Store';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <ListProduct />
        </Route>
        <Route path="/store">
          <Store />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
