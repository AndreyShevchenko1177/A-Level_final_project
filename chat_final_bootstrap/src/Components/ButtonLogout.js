import { actionAuthLogout } from "../Actions";
import { connect } from "react-redux";

const ButtonLogout = ({ onLogout, isLoggedIn }) => (
    <button onClick={onLogout} disabled={!isLoggedIn}>
        Logout
    </button>
);
export const CButtonLogout = connect((s) => ({ isLoggedIn: s.auth.login }), { onLogout: actionAuthLogout })(
    ButtonLogout
);

// export const CCButtonLogout = () => <CButtonLogout />;
