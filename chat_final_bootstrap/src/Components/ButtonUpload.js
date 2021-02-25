import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ButtonUpload = ({ isLoggedIn }) => (
    <Link to={"/upload"}>
        <button disabled={!isLoggedIn}> Upload</button>
    </Link>
);

export const CButtonUpload = connect((s) => ({ isLoggedIn: s.auth.login }))(ButtonUpload);
