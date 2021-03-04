import myPhoto from "../images/Iam_new2.jpg";
import { CButtonLogout, CLoginInfo } from "../Components";
import { Link } from "react-router-dom";

export const UserInfo = () => (
    <div className="LoginInfo">
        <Link to="/dashboard">
            <img src={myPhoto} />

            <CLoginInfo />
            <CButtonLogout />
        </Link>
    </div>
);
