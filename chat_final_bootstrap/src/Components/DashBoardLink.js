import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DashBoardLink = ({ payload }) => (
    <span>
        {payload ? <Link to="/dashboard"> {`Your login: ${payload}`}</Link> : <Link to="/">"You should log in"</Link>}
    </span>
);

export const CDashBoardLink = connect((s) => ({ payload: s.auth.payload }))(DashBoardLink);
