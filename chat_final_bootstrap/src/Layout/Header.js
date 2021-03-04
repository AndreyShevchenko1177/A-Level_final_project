import { Link } from "react-router-dom";
import { CButtonLogout, CButtonUpload } from "../Components";
import { CLoginInfo } from "../Components";
import { connect } from "react-redux";
import { PersonFillIcon } from "../images/icons";

import logo from "../images//logo23.jpg";

const Logo = ({ link = "" }) => <img src={logo} width="50px" />;
const CLogo = connect((s) => ({ link: s.auth.payloadId }))(Logo);

export const Header = () => (
    <div>
        <b>Header</b>
        <Link to={`/`}>
            <CLogo />
        </Link>
        <CLoginInfo />
        <CButtonLogout />
        <CButtonUpload />
        {/* <PersonFillIcon /> */}
    </div>
);
