import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Scan, Detail, Keranjang} from '../../View'


function Routes() {
    return (
        <Router>
        <barPredict />
        
          <Switch>
            <Route exact path="/">
                  <Scan />
            </Route>
            <Route path="/scan">
              <Scan />
            </Route>
            <Route path="/detail">
              <Detail />
            </Route>
            <Route path="/keranjang">
              <Keranjang />
            </Route>
            
          </Switch>
      </Router>
    );
}

export default Routes
