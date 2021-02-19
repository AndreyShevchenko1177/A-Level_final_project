import { Link } from "react-router-dom";
import { CButtonLogout } from "../Components";
import { CDashBoardLink } from "../Components";
import { connect } from "react-redux";

import logo from "../images//logo23.jpg";

const Logo = ({ link = "" }) => (
    <a href={`/${link}`}>
        <img src={logo} width="50px" />
    </a>
);

const CLogo = connect((s) => ({ link: s.auth.payloadId }))(Logo);

export const Header = () => (
    <div>
        <b>Header</b>
        <Link to={`/`}>
            <CLogo />
        </Link>
        <CDashBoardLink />
        <CButtonLogout />
    </div>
);
