import { Link } from "react-router-dom";
import { CButtonLogout, CButtonUpload } from "../Components";
import { CLoginInfo } from "../Components";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { PersonFillIcon } from "../images/icons";
import logo from "../images/logo23.png";

const Logo = ({ link = "" }) => <img src={logo} width="50px" />;

const CLogo = connect((s) => ({ link: s.auth.payloadId }))(Logo);

export const Header = () => (
    <>
        {/* <Navbar className="gradient" collapseOnSelect expand="sm" bg="dark" variant="dark"> */}
        <Navbar className="gradient header" collapseOnSelect bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Link to={`/about`} className="noUnderLine m-2">
                        <CLogo />
                        <Navbar.Brand className="mx-2 h1">Socket Chat</Navbar.Brand>{" "}
                    </Link>
                </Nav>
                <Nav className="ms-auto">
                    <CButtonLogout />
                    <CButtonUpload />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
);
