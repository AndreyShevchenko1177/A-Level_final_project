import { actionAuthLogout } from "../Actions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const ButtonLogout = ({ onLogout, isLoggedIn }) => (
    <Button className="gradient" variant="secondary btn-sm" onClick={onLogout} disabled={!isLoggedIn}>
        <i class="bi bi-door-open"></i> Logout
    </Button>
);
export const CButtonLogout = connect((s) => ({ isLoggedIn: s.auth.login }), { onLogout: actionAuthLogout })(
    ButtonLogout
);
