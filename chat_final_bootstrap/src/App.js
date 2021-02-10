import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import logo from "./images/logo23.jpg";

const Logo = () => <img src={logo} width="50px" />;

const Header = () => (
    <div>
        Header
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
        Sidebar
        <nav>
            <ul>
                {Object.entries(menuItems).map(([url, text]) => (
                    <MenuItem url={url} text={text} />
                ))}
            </ul>
        </nav>
    </aside>
);

const ChatContent = () => <aside>ChatContent</aside>;

const PageMain = () => (
    <div>
        <Sidebar />
        <ChatContent />
    </div>
);

const PageLogin = () => <div>PageLogin</div>;

const Footer = () => <div>Footer</div>;

const App = () => (
    <Router history={createHistory()}>
        <Header />
        <div>
            <Route path="/main" component={PageMain} exact />
            <Route path="/" component={PageLogin} exact />
        </div>
        <Footer />
    </Router>
);

export default App;
