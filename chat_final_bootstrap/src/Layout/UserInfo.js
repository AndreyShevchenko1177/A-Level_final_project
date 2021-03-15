import myPhoto from "../images/Iam_new2.jpg";
import personFillIcon from "../icons/person-fill.svg";
import { CButtonLogout, CLoginInfo } from "../Components";
import { Link } from "react-router-dom";
import { urlUploadConst } from "../const";
import { connect } from "react-redux";

const UserInfo = ({ avatarUrl }) => (
    <div className="bg-gradient bg-success text-white p-1 py-2 mb-2 text-white">
        <Link to="/dashboard" className="noUnderLine">
            <span className="m-2  text-nowrap avatarka">
                <img
                    className="border border-2 border-success bg-light"
                    src={avatarUrl ? `${urlUploadConst}/${avatarUrl}` : personFillIcon}
                />

                <CLoginInfo />
            </span>
        </Link>
    </div>
);

export const CUserInfo = connect((s) => ({ avatarUrl: s.auth && s.auth.avatarUrl }))(UserInfo);
