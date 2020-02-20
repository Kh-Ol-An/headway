import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./autorization/Login";
import Signup from "./autorization/Signup";
import Chat from "./Chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
