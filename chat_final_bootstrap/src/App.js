import React, { useRef, useState } from "react";
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
import { CPageMain, PageLogin, CPageNewChat, PageUpload, PageAbout, CPageSearch } from "./Pages";
import { actionFindChatsByUserId } from "./Actions";
import { urlUploadConst } from "./const";
import { store } from "./Reducers";
import { Button } from "bootstrap";

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

// const Proba111 = () => {
//     const refLink = useRef(null);
//     const [check, setCheck] = useState(true);
//     const [inp, setInp] = useState("");

//     return (
//         <>
//             <input checked={check} type="checkbox" onClick={(e) => setCheck(e.target.checked)}></input>
//             {check && (
//                 <div>
//                     <input value={inp} ref={refLink} onChange={(e) => setInp(e.target.value)}></input>
//                     <button onClick={(e) => console.log(refLink.current.value)}>CLICK</button>
//                 </div>
//             )}
//         </>
//     );
// };

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <div className="mainWrapper">
                    <Header />

                    <Switch>
                        <Route path="/about" component={PageAbout} exact />
                        <Route path="/newchat" component={CPageNewChat} exact />
                        <Route path="/newchat/:_chatId" component={CPageNewChat} exact />
                        <Route path="/upload" component={PageUpload} exact />
                        <Route path="/" component={PageLogin} exact />
                        <Route path="/main/" component={CPageMain} exact />
                        <Route path="/main/:_chatId" component={CPageMain} exact />
                        <Route path="/111" component={Proba111} exact />
                        {/* <Route path="/search/" component={CPageSearch} exact /> */}

                        <Route component={PageNotFound} exact />
                    </Switch>

                    {/* <Footer /> */}
                </div>
            </Router>
        </Provider>
    );
};

export default App;
