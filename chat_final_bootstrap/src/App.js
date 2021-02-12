import React from "react";
import "./App.css";
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
import logo from "./images/logo23.jpg";

const Logo = () => <img src={logo} width="50px" />;

const Header = () => (
    <div>
        <b>Header</b>
        <Link to={"/"}>
            <Logo />
        </Link>
    </div>
);

const menuItems = {
    "/settings": "Настройки",
    "/newchat": "Новый чат",
    "/serchChat": "Поиск чата",
    // "": "",
};

const MenuItem = ({ url, text }) => (
    <li>
        <Link to={url}>{text}</Link>
    </li>
);

const Sidebar = () => (
    <aside>
        <b>Sidebar</b>
        <nav>
            <ul>
                {Object.entries(menuItems).map(([url, text]) => (
                    <MenuItem url={url} text={text} key={url} />
                ))}
            </ul>
        </nav>
    </aside>
);

const ChatsList = () => (
    <aside>
        <b>ChatsList</b> <br />
        chat1 <br />
        chat2 <br />
        chat3 <br />
        chat4 <br />
    </aside>
);

const ChatContain = () => (
    <aside>
        <b>ChatContain</b> <br />
        message1 <br />
        message2 <br />
        message3 <br />
        message4 <br />
        message5 <br />
    </aside>
);

const PageMain = () => (
    <div>
        <Sidebar />
        <ChatsList />
        <ChatContain />
    </div>
);

const LoginForm = () => (
    <div>
        <input></input>
        <button
            onClick={() => {
                console.log("лагин");
                history.push("/main");
            }}
        >
            Login
        </button>
    </div>
);

const PageLogin = () => (
    <div>
        <b>PageLogin</b>
        <LoginForm />
    </div>
);

const Footer = () => (
    <div>
        <b>Footer</b>
    </div>
);

const PageSettings = () => <div>PageSettings</div>;
const PageNewChat = () => <div>PageNewChat</div>;
const PageSerchChat = () => <div>PageSerchChat</div>;
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
                <Route path="/settings" component={PageSettings} exact />
                <Route path="/newchat" component={PageNewChat} exact />
                <Route path="/serchChat" component={PageSerchChat} exact />
                <Route path="/" component={PageLogin} exact />
                <Route component={PageNotFound} exact />
            </Switch>
        </div>
        <Footer />
    </Router>
);

export default App;
