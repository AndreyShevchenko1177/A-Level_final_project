import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import {
    // BrowserRouter as Router, // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    Redirect,
} from "react-router-dom";
import history from "./history";

import { Header, Footer } from "./Layout";
import { PageMain, PageLogin, PageNewChat } from "./Pages";

const PageNotFound = () => {
    setTimeout(() => {
        history.push("/main");
    }, 3000);
    return (
        <div>
            <b>404</b>
        </div>
    );
};

const App = () => (
    <Router history={history}>
        <Header />
        <div>
            <Switch>
                <Route path="/main" component={PageMain} exact />
                <Redirect from="/aboutus" to="/main" exact />
                <Route path="/newchat" component={PageNewChat} exact />
                <Route path="/" component={PageLogin} exact />
                <Route component={PageNotFound} exact />
            </Switch>
        </div>
        <Footer />
    </Router>
);

export default App;
