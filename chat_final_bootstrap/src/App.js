import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./icons/bootstrap-icons.css";
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
import { CPageMain, PageLogin, PageNewChat, PageUpload, PageAbout, CPageSearch } from "./Pages";
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
            <Header />

            <Switch>
                <Route path="/about" component={PageAbout} exact />
                <Route path="/newchat" component={PageNewChat} exact />
                <Route path="/upload" component={PageUpload} exact />
                <Route path="/" component={PageLogin} exact />
                <Route path="/main/:_chatId" component={CPageMain} exact />
                <Route path="/main/" component={CPageMain} exact />
                <Route path="/search/" component={CPageSearch} exact />

                <Route component={PageNotFound} exact />
            </Switch>

            {/* <Footer /> */}
        </Router>
    </Provider>
);

export default App;
