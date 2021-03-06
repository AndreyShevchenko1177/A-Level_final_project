import myPhoto from "../images/Iam_new2.jpg";
import personFillIcon from "../icons/person-fill.svg";
import { CButtonLogout, CLoginInfo } from "../Components";
import { Link } from "react-router-dom";
import { urlUploadConst } from "../const";

export const UserInfo = ({ avatarUrl }) => (
    <div className="userInfo bg-gradient bg-success text-white p-1 py-2 mb-2 text-white">
        <Link to="/dashboard" className="userInfo noUnderLine">
            <span className="m-2  text-nowrap">
                <img
                    className="border border-2 border-success bg-light"
                    src={avatarUrl ? `${urlUploadConst}/${avatarUrl}` : personFillIcon}
                />

                <CLoginInfo />
            </span>
        </Link>
    </div>
);
