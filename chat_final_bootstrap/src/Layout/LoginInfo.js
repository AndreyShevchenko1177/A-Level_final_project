import myPhoto from "../images/Iam_new2.jpg";
import { CButtonLogout, CDashBoardLink } from "../Components";

export const LoginInfo = () => (
    <div className="LoginInfo">
        <img src={myPhoto} />
        <CDashBoardLink />
        <CButtonLogout />
    </div>
);
