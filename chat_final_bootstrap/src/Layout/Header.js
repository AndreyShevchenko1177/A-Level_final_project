import { Link } from "react-router-dom";

import logo from "../images//logo23.jpg";

const Logo = () => <img src={logo} width="50px" />;

export const Header = () => (
    <div>
        <b>Header</b>
        <Link to={"/"}>
            <Logo />
        </Link>
    </div>
);
