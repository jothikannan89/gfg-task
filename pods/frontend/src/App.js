import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import './App.css';
import SignIn from "./components/singnIn";
import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import CurrentOrders from "./components/currentOrder";
import NewOrder from "./components/newOrder";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={SignIn} />
        <PrivateRoute exact path="/currentorders" component={CurrentOrders} />
        <PrivateRoute exact path="/neworder" component={NewOrder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
