import logo from './logo.svg';
import './App.css';
import ListProduct from './conpoment/ListProduct';
import Store from './conpoment/Store';
import Admin from './conpoment/Admin';
import ModalAddNew from './conpoment/ModalAddNew';
import ModalEdit from './conpoment/ModalEdit';
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
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/addnew">
          <ModalAddNew />
        </Route>
        <Route path="/editdata">
          <ModalEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
