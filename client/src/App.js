import React from "react";
import {Provider} from 'react-redux'
import store from "./utils/redux/store"
import { Home, Login, Signup } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Provider store ={store}>
       <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
    </Provider>
   
  );
}

export default App;
