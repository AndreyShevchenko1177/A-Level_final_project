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
import { Provider, connect } from "react-redux";
import { Header, Footer } from "./Layout";
import { CPageMain, PageLogin, PageNewChat } from "./Pages";
import { actionFindChatsByUserId } from "./Actions";

import { store } from "./Reducers";

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
    <Provider store={store}>
        <Router history={history}>
            <div className="mainWrapper">
                <Header />
                <div>
                    <Switch>
                        <Redirect from="/aboutus" to="/main" exact />
                        <Route path="/newchat" component={PageNewChat} exact />
                        <Route path="/" component={PageLogin} exact />
                        <Route path="/main/:_userId" component={CPageMain} exact />

                        <Route component={PageNotFound} exact />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    </Provider>
);

export default App;
