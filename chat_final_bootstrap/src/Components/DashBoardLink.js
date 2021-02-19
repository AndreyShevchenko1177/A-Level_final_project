import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DashBoardLink = ({ payload }) => (
    <span>
        {payload ? (
            <Link to="/dashboard"> {`Ваш логин: ${payload}`}</Link>
        ) : (
            <Link to="/">"Надо бы залогигиниться"</Link>
        )}
    </span>
);

export const CDashBoardLink = connect((s) => ({ payload: s.auth.payload }))(DashBoardLink);
