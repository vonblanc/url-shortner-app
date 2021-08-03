import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {getDataForShortUrl} from "./utils/ClientUtils";
import Setup, {SetupApp} from "./pages/Setup";
import Stats from "./pages/Stats";

const App = ()=> {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={Setup} />
      <Route path="/:shortUrl/stats" component={Stats} />
      </Switch>
    </div>
  );
}

export default App;
